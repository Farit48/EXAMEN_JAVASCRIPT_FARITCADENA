class Mydash extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = `
            <header id="headDash">
            
            </header>
            <main>
                <h2>El dia de hoy tu agenda es</h2>
                <div>
                    <section id="show">
                        
                    </section>
                    <section>
                        <button type="button" id="btnNewAct">Dame click si deseas una actividad</button>
                    </section>
                </div>
            </main>`
    }
    connectedCallback(){
        console.log('me enlace correctamente ')
        const btnNewAct = document.getElementById('btnNewAct')
        btnNewAct.addEventListener('click', ()=>{
            const bodyAgendar =document.getElementById('body')
            bodyAgendar.innerHTML = '<agendar-etiqueta></agendar-etiqueta>'
           
        })
        
        addEventListener('DOMContentLoaded', ()=>{
            const headDash = document.getElementById('headDash')
            const show = document.getElementById('show')
            
            
            
            abrirDB((db)=>{
                const transaction = db.transaction(["Tareas"], "readonly")
                const almacentareas = transaction.objectStore("Tareas")
                const requestTareas = almacentareas.getAll();
  
                
                requestTareas.onsuccess = (event)=> {
                    
                    const datos = event.target.result;
                    datos.forEach(element => {
                        const text =JSON.stringify(element)
                        const campo = document.createElement('div')
                        show.appendChild(campo)
                        campo.innerHTML = `<div>${text}</div>`
                        console.log(text)
                        
                    });
                    
                    
                    
                    
                };
                
                
                requestTareas.onerror = (event)=> {
                  console.error("Error al obtener los datos:", event.target.error);
                };
              
              
             
                console.log(almacentareas)



                headDash.innerHTML = `<h1>Bienvenido Usuario</h1>`
                
                
            })
        })
       
    }

}
customElements.define("my-dash", Mydash)
const bodydash = document.getElementById('body')
bodydash.innerHTML = `<my-dash></my-dash>`