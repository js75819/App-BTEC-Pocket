import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput,Image, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const DimissKeyboard = ({ children }) =>(
  <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

const App = () => {

const{loading, setLoading} = useState(true)
const [saldoCarteira, setSaldoCarteira] = useState('')

const getSaldoCarteira = async () =>{
        const value = await AsyncStorage.getItem("saldoCarteira");
        if(value) { 
         await handleLoadButton(value)
          setSaldoCarteira(value)
        }
        
  }
  const salvarSaldo = async (value) => {
      await AsyncStorage.setItem("saldoCarteira",value)
     handleLoadButton(value)
  }
  const [saldo, setSaldo] = useState([0])
  const handleLoadButton = async (value) => {
    
    const req = await fetch(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xD890661EF4f88452265D36a290Fa09aC476C2020&address=${value}&tag=latest&apikey=RIDWPI57J2AWWNJCV66R1TQF2W45J7SP1W`)
      const json = await req.json();
  if(json) {
    setSaldo(json)
  }
  
  }
  const [cotacao, setCotacao] = useState([])

  const handleLoadPrice = async () => {
    const req = await fetch(`https://api.pancakeswap.info/api/v2/tokens/0xD890661EF4f88452265D36a290Fa09aC476C2020`)
      const json = await req.json();
  if(json) {
    setCotacao(json.data)
  }
  
  }
//
const [cotacaobrl, setCotacaoBRL] = useState([])
  const handleLoadPriceBRL = async () => {
    const req = await fetch(`https://api.pancakeswap.info/api/v2/tokens/0x9e691fd624410d631c082202b050694233031cb7`)
      const json = await req.json();
  if(json) {
    setCotacaoBRL(json.data)
  }

  }

  const [suplymax, setSuplyMax] = useState([])
  const handleLoadSuply = async () => {
    const req = await fetch(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0xD890661EF4f88452265D36a290Fa09aC476C2020&apikey=RIDWPI57J2AWWNJCV66R1TQF2W45J7SP1W`)
      const json = await req.json();
  if(json) {
    setSuplyMax(json)
  }

  }
 
 const [buraconegro, setSaldoBN] = useState([0])
  const handleLoadBN = async (value) => {
    
    const req = await fetch(`https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0xD890661EF4f88452265D36a290Fa09aC476C2020&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=RIDWPI57J2AWWNJCV66R1TQF2W45J7SP1W`)
      const json = await req.json();
  if(json) {
    setSaldoBN(json)
  }
 
  }

//
  useEffect(()=>{
    getSaldoCarteira()
   handleLoadPrice()
   handleLoadPriceBRL()
   handleLoadSuply()
   handleLoadBN()
   
  },[])

  const [idsaldo, setIdsaldo] =useState("")
  const mudarSaldo=()=>{}
  return (
    <DimissKeyboard>
    <View style={styles.container}>
    <View style={styles.imagemarea}>
    <View style={styles.titulo}>
    <Text style={styles.paragraphtitle}>BTEC Pocket</Text>
     </View> 
     <View style={styles.imagemarea1}>
    <Image style={styles.imagem} source={require('./btec.png')}></Image>
    </View> 
    <View style={styles.saldoarea}>
     <Text style={styles.paragraph1} >R$ {(1/cotacaobrl.price*cotacao.price*(saldo.result/1000000000)).toLocaleString('pt-BR')}</Text>
      <Text style={styles.paragraph2}>US$ {((saldo.result/1000000000)*cotacao.price).toLocaleString('pt-BR')}</Text>
      <Text style={styles.paragraph2}>BNB {((saldo.result/1000000000)*cotacao.price_BNB).toLocaleString('pt-BR')}</Text>
      </View>
      <TextInput 
      style={styles.textInput}
      value={saldoCarteira}
      onBlur={()=>salvarSaldo(saldoCarteira)}
      placeholder="Sua Carteira"
      onEndEditing={this.clearFocus}
      onChangeText={text =>setSaldoCarteira(text)}
      />
      <View style={styles.qtdarea}>
       <TouchableHighlight style={styles.touchableHighlight} activeOpacity={50} onPress={handleLoadPrice}> 
      <Text> Atualizar </Text>
      </TouchableHighlight >
       <Text style={styles.qtdarea}> {saldo.result && (parseFloat(saldo.result)/1000000000).toLocaleString('pt-BR') } BTEC </Text>
       </View>  
       
     
     </View> 
    <SafeAreaView  style={styles.container2}>
      
      
      <Text style={styles.paragraph3}>Cotação atual</Text>
      <View style={styles.saldoarea1}>
      <Text >R$   {cotacao.price ?parseFloat(1/cotacaobrl.price*cotacao.price).toFixed(9):'carregando...'}</Text>
      <Text >US$ {cotacao.price ?parseFloat(cotacao?.price).toFixed(9):'carregando...'}</Text>
      <Text >BNB {cotacao.price_BNB ?parseFloat(cotacao?.price_BNB).toFixed(9):'carregando...'}</Text>
      </View>
      <Text style={styles.paragraph3}>Suply</Text>
  <View style={styles.saldoarea1}>
      <Text >Máximo {suplymax.result && (parseFloat(suplymax.result)/1000000000).toLocaleString('pt-BR')}</Text>
      <Text >Circulante {((parseFloat(suplymax.result)- buraconegro.result)/1000000000).toLocaleString('pt-BR')}</Text>
      <Text >Tokens queimados {buraconegro.result && (parseFloat(buraconegro.result)/1000000000).toLocaleString('pt-BR')}</Text>
      
      </View>
      
    </SafeAreaView>
    </View>
    </DimissKeyboard>
  );

}
export default App;
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff', 
    flex: 1
  },

   container2: {
    backgroundColor: '#fff',
  
    
   },
  paragraphtitle: {
    margin: 5,
    fontSize: 30,
    fontWeight: 'bold',
    color:"#fff"
  
  },
    paragraph1: {

    fontSize: 30,
    fontWeight: 'bold',
    color:'#fff'
  
  },
  paragraph2: {

    fontSize: 15,
    fontWeight: 'bold',
    color:'#fff'
  
  },

   paragraph3: {

    fontSize: 25,
    fontWeight: 'bold',
    color:'#000'
  
  },
   
      imagem:{
      width:'100%',
      height:'70%',
       
      },

      touchableHighlight:{
        marginTop:10,
        color:'#fff'
      },

      
 textInput: {
   backgroundColor:'#fff',
   color:'#000',
   borderRadius:5,
   height:30,
   width:"90%",

   
   

 },
 qtdarea: {

   fontSize:30,
   alignItems:'center',
   color:'#FFD93B'
   

 },

 saldoarea:{

   borderRadius:5,
   width:'100%',
   marginBottom:25,
   alignItems:'center',
  

 },
 saldoarea1:{
   borderRadius:5,
   width:'90%',
   marginBottom:15,
   marginTop:10,
  backgroundColor:"#ddd",
  marginLeft:15
  

 },
   imagemarea:{
     backgroundColor:'#253140',
     flex:2,
     alignItems:'center',
     justifyContent:'center'
          },
          imagemarea1:{
    

     width:'25%',
     height:'25%'
          },
    titulo:{

      color:'#fff'
    }

});

//https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=0xe9e7cea3dedca5984780bafc599bd69add087d56&apikey=YourApiKeyToken carteira 0x7F1c55f116eeaA9b5Fe4c9dD7B8df93dB9338Fd1 
//<Button title="Carregar cotacao" onPress={handleLoadPrice}/>
///<Button style={styles.botao} title="Carregar saldo" onPress={handleLoadButton}/>