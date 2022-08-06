const { BlobServiceClient } = require("@azure/storage-blob");
let FileSaver = require('file-saver');

const accountName = "loremstorage";
const containerName= "lorem";
const sasString ="?sp=r&st=2022-06-09T03:49:01Z&se=2022-07-09T11:49:01Z&spr=https&sv=2021-06-08&sr=c&sig=N%2BIlgp02n2ZKoYzSnfBy7f%2FxCi8NJM37IgBPErZUXDE%3D"
// const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/${containerName}/token${sasString}`);



let vm = new Vue({
    el: "#app",
    data: {
      loading: false,
      tokenid: "",
      tokens:[],
      cards: [],
      nextItem:0,
      isdetail:false,
      isdownload:false,
      ismobilefilter:true,
      bigdisplay:'none',
      bigcard:[],
      search:{
          reolm:'',
          tribe:'',
          body:'',
          front:'',
          back:'',
          mouth:'',
          eyes:'',
          hair:'',
          accessory:'',
          clothing:''
        },
      reolms:[],
      reolmselected:[],
      isreolm:false,
      tribes:[],
      tribeselected:[],
      istribe:false,
      eyes:[],
      eyesselected:[],
      iseyes:false,
      mouths:[],
      mouthselected:[],
      ismouth:false,
      hairs:[],
      hairselected:[],
      ishair:false,
      bodies:[],
      bodyselected:[],
      isbody:false,
      fronts:[],
      frontselected:[],
      isfront:false,
      backs:[],
      backselected:[],
      isback:false,
      accessories:[],
      accessoryselected:[],
      isaccessory:false,
      clothings:[],
      clothingselected:[],
      isclothing:false,
      interfaces:[],
      interfaceselected:[],
      isinterface:false,
      backgrounds:[],
      backgroundselected:[],
      isbackground:false,
      ones:[],
      oneselected:[],
      isone:false

    },
    created(){
      // console.log('created')
    },
    mounted(){
      // console.log('mounted')
      // this.cards = await d3.csv(`https://loremstorage.blob.core.windows.net/lorem/loremnft_token.csv${sasString}`)
       //this.fetchdata();
    },
    methods: {
       

        downloadsvg: async function(blobfile) {
          try{  
            // const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/lorem/token${sasString}`);
            const containerClient = blobServiceClient.getContainerClient('svg');
            const blobClient = containerClient.getBlobClient(blobfile);
            const downloadBlockBlobResponse = await blobClient.download(blobfile, 0, undefined);
            const data = await downloadBlockBlobResponse.blobBody;
            // Saves file to the user's downloads directory
            FileSaver.saveAs(data, `svg_${new Date().getTime()}.svg`); // FileSaver.js}
          }
          catch(error){
            console.log(error)
          }
        },
        downloadhtml: async function(blobfile) {
          try{  
            // const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/lorem/token${sasString}`);
            const containerClient = blobServiceClient.getContainerClient('html');
            const blobClient = containerClient.getBlobClient(blobfile);
            const downloadBlockBlobResponse = await blobClient.download(blobfile, 0, undefined);
            const data = await downloadBlockBlobResponse.blobBody;
            // Saves file to the user's downloads directory
            FileSaver.saveAs(data, `html_${new Date().getTime()}.html`); // FileSaver.js}
          }
          catch(error){
            console.log(error)
          }
        },
        downloadgif: async function(blobfile) {
          try{  
            // const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/lorem/token${sasString}`);
            const containerClient = blobServiceClient.getContainerClient('gif');
            const blobClient = containerClient.getBlobClient(blobfile);
            const downloadBlockBlobResponse = await blobClient.download(blobfile, 0, undefined);
            const data = await downloadBlockBlobResponse.blobBody;
            // Saves file to the user's downloads directory
            FileSaver.saveAs(data, `gif_${new Date().getTime()}.gif`); // FileSaver.js}
          }
          catch(error){
            console.log(error)
          }
        },
        reset: function(){
          
          this.isdetail=false
          this.isdownload=false
          this.reolmselected = []
          this.tribeselected = []
          this.bodyselected = []
          this.frontselected = []
          this.backselected = []
          this.clothingselected = []
          this.accessoryselected = []
          this.mouthselected = []
          this.eyesselected = []
          this.hairselected = [] 
          this.oneselected = []
          this.backgroundselected = []
          this.interfaceselected = []
        },
        zoombig: function(card){
          this.bigcard = card
          // this.isbighide = false
          // this.isbigshow = true
          this.bigdisplay = 'block'
        },
        zoomclose: function(){
          this.bigdisplay = 'none'
        },
        leftclas: function(){
          vm.ismobilefilter = false
        }
      },
      watch:{
        reolmselected:function(){
   
          totalFile();
        },
        tribeselected:function(){

          totalFile();
        },
        bodyselected:function(){

          totalFile();
        },
        backselected:function(){

          totalFile();
        },  
        frontselected:function(){

          totalFile();
        },  
        clothingselected:function(){

          totalFile();
        },  
        accessoryselected:function(){

          totalFile();
        },  
        hairselected:function(){

          totalFile();
        },  
        mouthselected:function(){

          totalFile();
        },
        eyesselected:function(){

          totalFile();
        },
        interfaceselected:function(){

          totalFile();
        },
        backgroundselected:function(){

          totalFile();
        },
        oneselected:function(){

          totalFile();
        },
        tokenid:function(){
          totalFile();
          // console.log(tokenid)
        }

      }
})


const loadtrait = () => {
  d3.csv(`https://loremstorage.blob.core.windows.net/lorem/loremnft_trait_count.csv${sasString}`, function(data) {

    vm.reolms = data.filter(d => d.TRAIT == "REOLM")
    vm.tribes = data.filter(d => d.TRAIT == "TRIBE")
    vm.bodies = data.filter(d => d.TRAIT == "BODY")
    vm.fronts = data.filter(d => d.TRAIT == "FRONT")
    vm.backs = data.filter(d => d.TRAIT == "BACK")
    vm.accessories = data.filter(d => d.TRAIT == "ACCESSORIES")
    vm.hairs = data.filter(d => d.TRAIT == "HAIR")
    vm.eyes = data.filter(d => d.TRAIT == "EYES")
    vm.mouths = data.filter(d => d.TRAIT == "MOUTH")
    vm.clothings = data.filter(d => d.TRAIT == "CLOTHING")
    vm.interfaces = data.filter(d => d.TRAIT == "INTERFACE")
    vm.backgrounds = data.filter(d => d.TRAIT == "BACKGROUND")
    vm.ones = data.filter(d => d.TRAIT == "ONE_TAG")
  })

}

const totalFile = () => {
  vm.nextItem = 0;
  vm.cards = [];
  // let resultData = vm.tokens
  d3.csv(`https://loremstorage.blob.core.windows.net/lorem/loremnft_token.csv${sasString}`, function(data) {
    let resultData = data

    if (vm.reolmselected.length>0){
        resultData = resultData.filter(function(d) {
          return vm.reolmselected.indexOf(d.REOLM) != -1
      });

    }
    if (vm.tribeselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.tribeselected.indexOf(d.TRIBE) != -1
    });
    }
    if (vm.bodyselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.bodyselected.indexOf(d.BODY) != -1
    });
    }
    if (vm.frontselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.frontselected.indexOf(d.FRONT) != -1
    });
    }
    if (vm.backselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.backselected.indexOf(d.BACK) != -1
    });
    }
    if (vm.clothingselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.clothingselected.indexOf(d.CLOTHING) != -1
    });
    }
    if (vm.accessoryselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.accessoryselected.indexOf(d.ACCESSORIES) != -1
    });
    }
    if (vm.mouthselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.mouthselected.indexOf(d.MOUTH) != -1
    });
    }
    if (vm.hairselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.hairselected.indexOf(d.HAIR) != -1
    });
    }
    if (vm.eyesselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.eyesselected.indexOf(d.EYES) != -1
    });
    }
    if (vm.backgroundselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.backgroundselected.indexOf(d.BACKGROUND) != -1
    });
    }
    if (vm.interfaceselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.interfaceselected.indexOf(d.INTERFACE) != -1
    });
    }
    if (vm.oneselected.length>0){
      resultData = resultData.filter(function(d) {
        return vm.oneselected.indexOf(d.ONE_TAG) != -1
    });
    }
    if (vm.tokenid!=""){
      resultData = resultData.filter(function(d) {
        return vm.tokenid.indexOf(d.ID) != -1
    });
    }

  vm.tokens = resultData;
  loadMore();
  })
}


const init = () => { 
  apiUrl ="/nft/tokens"
  axios.get(apiUrl).then(res=>{
    this.tokens=res.data
    loadMore()
  })
  // d3.csv(`https://loremstorage.blob.core.windows.net/lorem/loremnft_token.csv${sasString}`, function(data) {
  //     let resultData = data
  //     vm.tokens = resultData
  //     loadMore();
  // })
}
const loadMore = async () => {
    
    // d3.csv(`https://loremstorage.blob.core.windows.net/lorem/loremnft_token.csv${sasString}`, function(data) {
    vm.loading=true;
    data = vm.tokens
    for(let i=0 ; i<20; i++){
        k = vm.nextItem;
        if(k<data.length){
          tokenmeta = {}
          tokenmeta['id'] = `${data[k]['ID']}`
          tokenmeta['cover'] = `https://loremstorage.blob.core.windows.net/lorem/token/svg/${data[k]['TOKEN_FILE']}.svg${sasString}`
          tokenmeta['svg_file'] = `${data[k]['TOKEN_FILE']}.svg`
          tokenmeta['html_file'] = `${data[k]['TOKEN_FILE']}.html`
          tokenmeta['gif_file'] = `${data[k]['TOKEN_FILE']}.gif`
          tokenmeta['eyes'] = `${data[k]['EYES']}`
          tokenmeta['clothing'] = `${data[k]['CLOTHING']}`
          tokenmeta['accessories'] = `${data[k]['ACCESSORIES']}`
          tokenmeta['body'] = `${data[k]['BODY']}`
          tokenmeta['front'] = `${data[k]['FRONT']}`
          tokenmeta['back'] = `${data[k]['BACK']}`
          tokenmeta['mouth'] = `${data[k]['MOUTH']}`
          tokenmeta['hair'] = `${data[k]['HAIR']}`
          tokenmeta['tribe'] = `${data[k]['TRIBE']}`
          tokenmeta['reolm'] = `${data[k]['REOLM']}`
          tokenmeta['one'] = `${data[k]['ONE_TAG']}`
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



  