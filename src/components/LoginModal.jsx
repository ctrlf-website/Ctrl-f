import LoginForm from "./LoginForm";

export default function LoginModal({ handleLogin }) {
  return (
<div className="min-h-[40vh] w-[70%] mx-auto flex flex-col justify-center items-center text-center">
<p>Este proyecto esta alojado en google, es decir que uso sus servidores y su espacio en la nube. <br/>
 Por lo tanto, para guardar tu sitio web necesito saber que sos un usuario real. <br/>
 Podes iniciar sesion con tu cuenta de google, ellos se encargan de todo, yo no recopilo ningun dato tuyo, solo tu email para vincularlo a tu sitio web.</p>
  <LoginForm handleLogin={handleLogin} />
</div>
);
}
