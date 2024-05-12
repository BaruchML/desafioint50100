console.log('Buenas desde .js');

// const form = document.getElementById("formPremium");

//                             //async nos genera un ambiente asincrono
//         const handleSubmit = async (event) => {
//             event.preventDefault();

//             //lo siguiente es para recibir un req, desde el form
//             // const name = document.getElementById("name").value;
//             const formData = new FormData(event.target);
//             try {                          //FETCH HACEMOS PETICIONES DE ACCESO A RUTA
//                 const response = await fetch("/api/users/:uid/documents", {
//                     method: "POST",
//                     body: formData
//                 })

//                 const data = await response.json();
//                 console.log(data);

//                 event.target.reset();

//             } catch (error) {
//                 console.log(error);
//             }

//         }
//         form.addEventListener("submit", handleSubmit);