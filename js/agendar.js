class Agendar extends HTMLElement {
    constructor(){
        super();
        this.innerHTML = `
        <section>
            <form action="">
                <p>Titulo</p>
                <input type="text" id="titulo">
                <p>Descripcion de la Actividad</p>
                <textarea name="" id="desc" cols="30" rows="10"></textarea>
                <p>Ubicacion</p>
                <textarea name="" id="ubic" cols="30" rows="10"></textarea>
                <p>Inicia a las:</p>
                <input type="time" id="horaI">
                <p>Termina a las:</p>
                <input type="time" id="horaF">
            </form>
            <p>Aqui se agrega una nueva actividad</p>
            <input type="date" id="Fecha" ><br>
            <button type="button" id="saveAC">Agendar</button>
        </section>
        `
    }
    connectedCallback(){
        console.log('hola soy la etiqueda de agendar ya conectada al doom')
        const saveAC = document.getElementById('saveAC')
        saveAC.addEventListener('click', ()=>{

            const Fecha = document.getElementById('Fecha').value

            abrirDB((db)=>{
                console.log('Se dio click en guardar')
                const nuewActivity =[{
                   titulo:document.getElementById('titulo').value,
                   descripcion: document.getElementById('desc').value,
                   ubicacion: document.getElementById('ubic').value,
                   horaI: document.getElementById('horaI').value,
                   horaF: document.getElementById('horaF').value,
                   fecha:Fecha
                }]
                const transaction = db.transaction(["Tareas"], "readwrite")
                const miActividad = transaction.objectStore("Tareas")
                const addmiActividad = miActividad.add(nuewActivity)

                addmiActividad.onsuccess= ()=>{
                    console.log('se agrego la actividad correctamente')
                    const bodyMAIN = document.getElementById('body')
                    bodyMAIN.innerHTML=`
                    <style>
                    .efecto{
                        opacity:0;
                        animation: animation 4s ease 0.1s forwards ;
                        width:50%;
                        margin:auto;
                    }
                    @keyframes animation {
                        0%{opacity: 0;}
                        50%{opacity: 1;}
                        75%{opacity: 0;}
                        100%{opacity: 1;}
                    }
                    </style>
                    <h1 class="efecto">AGREGANDO LA ACTIVIDAD</h1>`
                    setTimeout(()=>{
                        main.innerHTML=`
                            <style>
                            .efecto{
                                opacity:0;
                                animation: animation 4s ease 0.1s forwards ;
                                width:50%;
                                margin:auto;
                            }
                            @keyframes animation {
                                0%{opacity: 0;}
                                50%{opacity: 1;}
                                75%{opacity: 0;}
                                100%{opacity: 1;}
                            }
                            </style>
                            <h1 class="efecto">ACTIVIDAD AGREGADO CON EXITO</h1>`
                    }, 5000)
                    setTimeout(()=>{
                        window.location.href = "/dashboard.html"
                    }, 10000)
                    
                }
                addmiActividad.onerror = ()=>{
                    console.log("Erro al agregar")
                }
            })
        })
        
       

    }
}
customElements.define('agendar-etiqueta',Agendar )