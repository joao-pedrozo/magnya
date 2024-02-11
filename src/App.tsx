import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";

function App() {
  const [url, setUrl] = useState("");

  return (
    <div className="flex items-center mt-4 flex-col">
      <div className="flex flex-col">
        <div className="border p-10 flex items-center max-w-4xl rounded-xl gap-8">
          <div className="flex flex-col">
            <span className="text-4xl font-bold text-[#1e1e1e] block mb-2">
              Bem-vindo(a)!
            </span>
            <span>
              Eliminamos o trabalho de se conectar com outras pessoas para que
              você possa realizar mais.
            </span>
            <Separator className="my-3" />
            <span className="text-md font-bold block">Crie sua URL</span>
            <span>
              Escolha uma URL personalizada para compartilhar com seus clientes.
            </span>
            <div className="flex mt-2 flex-col">
              <div className="flex gap-1">
                <span className="text-md font-bold block mt-2">
                  magnya.com.br/
                </span>
                <Input
                  className="h-19"
                  onChange={(event) => {
                    setUrl(event.target.value);
                  }}
                />
              </div>
              <Button
                className="bg-blue-700 hover:bg-blue-600 font-bold mt-4 disabled:opacity-50 transition-all"
                disabled={!url}
              >
                Continuar
              </Button>
            </div>
          </div>
          <div>
            <img src="./illustration.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
