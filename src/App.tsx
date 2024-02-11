function App() {
  return (
    <div className="flex items-center mt-4 flex-col">
      <div className="border p-5 flex max-w-3xl rounded-xl">
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-[#1e1e1e] block mb-2">
            Bem-vindo(a)!
          </span>
          <span>
            Eliminamos o trabalho de se conectar com outras pessoas para que
            você possa realizar mais.
          </span>
          <span className="text-md font-bold block mt-2">
            Crie sua URL Magnya
          </span>
          <span>
            Escolha uma URL personalizada para compartilhar com seus clientes
          </span>
        </div>
        <div>
          <img src="./illustration.png" />
        </div>
      </div>
    </div>
  );
}

export default App;
