export default function LoginForm({handleLogin}) {
  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Iniciar sesión con Google
    </button>
  );
}
