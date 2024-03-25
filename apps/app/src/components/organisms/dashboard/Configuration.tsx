import SectionTitle from "@/components/atoms/SectionTitle";
import { Textarea } from "@/components/ui/textarea";

export default function Configuration() {
  return (
    <div>
      <SectionTitle
        title="Configurações"
        subtitle="Aqui você pode configurar as informações da sua conta."
        className="mb-2"
      />
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              Mensagem de confirmação
            </span>
            <span className="text-sm text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
              Editar
            </span>
          </div>
          <Textarea
            className="mt-2 h-24"
            value="Olá! Espero que esteja tudo bem contigo! 😊 Estou aqui para lembrá-lo carinhosamente de que temos nossa consulta marcada para o dia {data}, às {hora}. Por favor, confirme sua presença quando puder. Estou ansiosa para vê-lo em breve!"
            disabled
          />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Mensagem de cobrança</span>
            <span className="text-sm text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
              Editar
            </span>
          </div>
          <Textarea
            className="mt-2 h-24"
            value="Olá! 😊 Segue em anexo o boleto referente à nossa transação. Agradecemos sua confiança e estamos à disposição para qualquer dúvida. Obrigada!"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
