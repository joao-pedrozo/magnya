import SectionTitle from "@/components/atoms/SectionTitle";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ClientsListing from "./components/ClientsListing";
import AddClientForm from "./components/AddClientForm";

export default function Clients() {
  return (
    <div>
      <SectionTitle
        title="Clientes"
        subtitle="Aqui você pode visualizar e gerenciar os seus clientes cadastrados."
        className="mb-4"
      />
      <div className="rounded-md">
        <div className="flex justify-between text-md">
          <div className="relative">
            <Search
              className="absolute top-[9px] left-[12px] text-zinc-500"
              size={20}
            />
            <Input
              placeholder="Procure por nome"
              type="text"
              className="w-fit mb-4 pl-10"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-700 gap-2 hover:bg-blue-800">
                <Plus />
                <span className="font-semibold">Adicionar cliente</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[760px]">
              <DialogHeader>
                <DialogTitle>Adicionar cliente</DialogTitle>
                <DialogDescription>
                  Preencha o formulário abaixo para adicionar um novo cliente.
                </DialogDescription>
              </DialogHeader>
              <AddClientForm />
            </DialogContent>
          </Dialog>
        </div>
        <ClientsListing />
      </div>
    </div>
  );
}
