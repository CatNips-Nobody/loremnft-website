const { BlobServiceClient } = require("@azure/storage-blob");
let FileSaver = require('file-saver');
// const accountName = "loremnft";
// const containerName= "lorem";
const sasString ="?sp=r&st=2022-07-26T02:26:54Z&se=2022-10-31T10:26:54Z&spr=https&sv=2021-06-08&sr=c&sig=gDayfeIg2x3zfLRaSFlMoLFpp%2Bx4jkOcvUXkWB%2BTMog%3D"
const blobServiceClient = new BlobServiceClient(`https://loremnft.blob.core.windows.net/lorem${sasString}`);
const attributes_list = ['BODY','FRONT','BACK','HAIR','EYES','MOUTH','CLOTHING','ACCESSORIES','INTERFACE','SYMBOL','DEPTH','SKY','SCAPE','SCENE','TRIBE','REOLM','1/1 Trait','CCO']
const filters_list = ['REOLM','TRIBE','BODY','FRONT','BACK','HAIR','EYES','MOUTH','CLOTHING','ACCESSORIES','INTERFACE','SYMBOL','DEPTH','SKY','SCAPE','SCENE','CCO']
const icon_list = {'REOLM':'fa-compass','TRIBE':'fa-users','BODY':'fa-heart-pulse','FRONT':'fa-square-caret-right','BACK':'fa-square-caret-left','CLOTHING':'fa-shirt'
,'HAIR':'fa-scissors','MOUTH':'fa-hand-lizard','EYES':'fa-eye','ACCESSORIES':'fa-bolt','SYMBOL':'fa-shapes','INTERFACE':' fa-toggle-on','SKY':'fa-rocket','SCAPE':'fa-mountain-sun'
,'SCENE':'fa-city', 'DEPTH':'fa-binoculars','CCO':'fa-brands fa-creative-commons-zero'}

let vm = new Vue({
    el: "#app",
    data: {
      loading: false,
      inittotal:"",
      tokenidstart: "",
      tokenidend: "",
      tokens:[],
      cards: [],
      nextItem:0,
      isdetail:false,
      isdownload:false,
      ismobilefilter:true,
      isoneone:false,
      bigdisplay:'none',
      bigscroll:'hidden',
      bigcard:[],       
      filters:[],

      // oneselected:[],

    },
    created(){
    },
    mounted(){
    },
    methods: {
       
       download: async function(blobfile,folder) {
        try{  
          // const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/lorem/token${sasString}`);
          const blobfilenme = `${blobfile}.${folder}`
          const containerClient = blobServiceClient.getContainerClient(folder);
          const blobClient = containerClient.getBlobClient(blobfilenme);
          const downloadBlockBlobResponse = await blobClient.download(blobfilenme, 0, undefined);
          const data = await downloadBlockBlobResponse.blobBody;
          // Saves file to the user's downloads directory
          FileSaver.saveAs(data, `${new Date().getTime()}.${folder}`); // FileSaver.js}
        }
        catch(error){
          console.log(error)
        }
      },
        selected: function(){
          totalFile();
          topFunction();
        },
        reset: function(){
          
          this.isdetail=false;
          this.isdownload=false;
          this.tokenidstart="";
          this.tokenidend="";
          this.isoneone=false;
          loadtrait();
          totalFile();
          topFunction();
        
        },
        zoombig: function(card){
          this.bigcard = card;
          this.bigdisplay = 'block'
        },
        zoomclose: function(){
          this.bigdisplay = 'none';
          this.bigcard = [];
        }
      }

})

const loadtrait = () => {
  d3.csv('file/loremnft_trait_count.csv', function(data) {
    vm.filters = [];
    filters_list.forEach(ele =>{
       filter={};
       filter['traitname'] = ele;
       filter['traits'] = data.filter(d => d.TRAIT == ele);
       filter['traitselected'] = [];
       filter['isopen'] = false;
       filter['searchtext'] = '';
       filter['icon'] = icon_list[ele];
       vm.filters.push(filter);
    })

  })

}

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const totalFile = () => {
  vm.nextItem = 0;
  vm.cards = [];
  d3.csv('file/loremnft_token.csv', function(data) {
    let resultData = data;
    vm.filters.forEach(ele =>{
      if (ele['traitselected'].length>0){
        resultData = resultData.filter(function(d) {
          return ele['traitselected'].indexOf(d[ele['traitname']]) != -1
      });
    }
    })

    if (vm.isoneone){
      resultData = resultData.filter(function(d) {
        return d.ONE_TAG == '1/1 Trait';
    });
    }
    if (vm.tokenidstart!=""){
      if(vm.tokenidend ==""){ vm.tokenidend = vm.inittotal}
      resultData = resultData.filter(function(d) {
        return parseInt(d.ID) >= parseInt(vm.tokenidstart)  && parseInt(d.ID) <= parseInt(vm.tokenidend)
    });
    }

  vm.tokens = resultData;
  loadMore();
  })
}


const init = () => { 
  d3.csv('file/loremnft_token.csv', function(data) {
      let resultData = data
      vm.tokens = resultData
      vm.inittotal = resultData.length
      loadMore();
  })
}
const loadMore = async () => {
    vm.loading=true;
    data = vm.tokens
    for(let i=0;i<12; i++){
        k = vm.nextItem;
        if(k<data.length){
          tokenmeta = {}
          tokenmeta['id'] = `${data[k]['ID']}`
          tokenmeta['cover'] = `https://loremnft.blob.core.windows.net/lorem/svg/token_${data[k]['ID']}.svg${sasString}`
          // tokenmeta['cover'] = `svg/token_${data[k]['ID']}.svg`
          tokenmeta['coverhtml'] = `https://loremnft.blob.core.windows.net/lorem/html/token_${data[k]['ID']}.html${sasString}`
          // tokenmeta['coverhtml'] = `html/token_${data[k]['ID']}.html`
          tokenmeta['file'] = `token_${data[k]['ID']}`
          attribute = []
          attributes_list.forEach(ele =>{
            trait = {}
            value =  `${data[k][ele]}`
            if (value != '-'){
              trait['trait_type'] = ele
              trait['value'] = value
              attribute.push(trait)
            }
          })
          tokenmeta['attribute'] = attribute
          vm.cards.push(tokenmeta)
          vm.nextItem++;
     
        }
      }
    vm.loading=false
  // });

}


$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() + 10 >= $(document).height() ) {
    loadMore();
    }
  });


window.onload = function(){
  loadtrait();
  init();

}



  