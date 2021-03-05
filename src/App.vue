<template >
  
  <div id="app">
    <HeaderC/>
    <label>Titulo Nota: </label><input v-model="tituloNuevoRecordatorio"><br><br>
    <label>Cuerpo Nota: </label><input v-on:keydown.enter="añadirRecordatorio()" v-on:keyup="teclaPulsada()" v-model="nuevoRecordatorio">
    <br><br>
    <button v-on:click="añadirRecordatorio()" v-bind:disabled="isDisabled">Añadir nota</button>
    <button  v-on:click="borrarCompletadas()">Borrar Completadas</button>
    <br><br><br>
    <label>Buscar por titulo: </label><input v-model="filtro">
    <p>Total de tareas: {{totalTareas}}</p>
    <p>Total de tareas completadas: {{totalCompletadas}}</p>
    <ol>
      <transition-group name="trans">
        <li v-for="(nota,index) in listaFiltrada" v-bind:key="nota.content">
          <div v-bind:class="{'azul':!nota.done, 'rojo':nota.done}"><button  v-on:click="cambiarEstado(index)">Completar</button>
            {{ nota.titulo}} -|- {{ nota.content}} -|- {{ nota.date.toDate()}} -|- Priority: {{nota.prioridad }} 
            <button v-if="!nota.done" v-on:click="cambiarPrioridad(index)">Prioridad</button>
          </div>
        </li>
      </transition-group>
    </ol>
  </div>
</template>

<script>
import HeaderC from './components/headerC.vue'
import {db} from './db.js'
export default {
  name: 'App',
  components: {
    HeaderC
  },
  data() {
    return{
      filtro:'',
      tituloNuevoRecordatorio: '',
      nuevoRecordatorio: '',
      listaNotas:[],
      isDisabled:true
    }
      
  },
  mounted()
  {

  },
  methods: {
    añadirRecordatorio: function()
        { 
          if(this.isDisabled==false){
            db.collection('notas').add({
              titulo:this.tituloNuevoRecordatorio,
              content:this.nuevoRecordatorio,
              date:new Date(),
              done:false,
              prioridad:"low"
            })
          this.nuevoRecordatorio="";
          this.isDisabled=true;
        }
      },
    cambiarEstado: function(index)
    {        
      index=this.listaNotas.indexOf(this.listaFiltrada[index]);
      this.listaNotas[index].done=!this.listaNotas[index].done;
    },
    teclaPulsada: function()
    {
      if(this.nuevoRecordatorio.length>0){
        this.isDisabled=false;
      }else{
        this.isDisabled=true;
      }
    },
    cambiarPrioridad: function(index)
    {
      index=this.listaNotas.indexOf(this.listaFiltrada[index]);
      switch(this.listaNotas[index].prioridad){
        case "low":this.listaNotas[index].prioridad="medium";break;
        case "medium":this.listaNotas[index].prioridad="high";break;
        case "high":this.listaNotas[index].prioridad="low";
      }
    },
    borrarCompletadas: function()
    {
      this.listaNotas.forEach(element => {
        if(element.done)
          db.collection('notas')
          .doc(element.id)
          .delete()
        });     
      this.listaNotas=this.listaNotas.filter((nota)=>{
        return!nota.done;
      });
      
    },
  },
  computed: 
  {
    totalTareas: function()
    {
      return this.listaNotas.length;
    },
    totalCompletadas: function()
    {
      let total=0;
      for(var i=0; i<this.listaNotas.length;i++){
        if(this.listaNotas[i].done==true)
          total++;
      }
      return total;
    },
    listaFiltrada: function()
    {
      return this.listaNotas.filter((notas)=>{
        return(notas.titulo.includes(this.filtro));
      })
    }
  },
  firestore: 
  {
      listaNotas: db.collection('notas')
  }
}

</script>

<style>
  button{
    margin-left:20px;
    margin-right:20px;
  }
  .azul{
    background-color: cornflowerblue;
    padding: 20px;
    border: solid 1px;
  }
  .rojo{
    background-color: red;
    padding: 20px;
    border: solid 1px;
  }
  li{
    list-style-type: none;
  }
  ol{
    padding:0;
  }
  .trans-item {
    display: inline-block;
    margin-right: 10px;
  }
  .trans-enter-active, .trans-leave-active {
    transition: all 1s;
  }
  .trans-enter/* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(100px);
  }
  .trans-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }
  .cabesa{
    background-color: antiquewhite;
  }
</style>
