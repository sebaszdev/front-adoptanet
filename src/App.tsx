import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router";
import { Dog, UserRoundCheck, UserRoundPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function App() {
  const [accItem, setAccItem] = useState<"acc-1" | "acc-2" | "acc-3">("acc-1");

  const items = [
    {
      icon: <Dog size={64} className="mx-auto" />,
      title: "Explora nuestro catalogo de animales",
      body: "Explora nuestro catalogo de animales para encontrar a tu proximo compañero de vida",
      button: "Ir a catalogo",
    },
    {
      icon: <UserRoundCheck size={64} className="mx-auto" />,
      title: "Inicia sesión",
      body: "¿Ya tienes una cuenta? Inicia sesión para empezar a ver animales que estan esperando un nuevo hogar",
      button: "Iniciar sesión",
    },
    {
      icon: <UserRoundPlus size={64} className="mx-auto" />,
      title: "Registrate",
      body: "¿No tienes una cuenta? Registrate para empezar a interactuar con rescatistas y fundaciones",
      button: "Registrarse",
    },
  ];


  const accordionHandler = (value: "acc-1" | "acc-2" | "acc-3") => {
    setAccItem(value);
  }

  return (
    <>
        <div className="w-full">
          <AspectRatio ratio={4 / 1} className="w-full">
            <div
              className="w-full h-full flex flex-col flex-wrap justify-end pb-10
              bg-[url(https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg)]
              bg-cover bg-no-repeat bg-center border-b-10"
            >
              <h1 className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-balance">
                AdoptaNet
              </h1>
              <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
                Encuentra tu proximo mejor amigo
              </p>
            </div>
          </AspectRatio>
        </div>
        <section className="bg-muted flex justify-center pt-30 pb-20 gap-x-10">
          {items.map((item, indx) => (
            <Card key={indx} className="w-full max-w-sm">
              <CardHeader> 
                {item.icon}
              </CardHeader>
              <CardContent>
                <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
                  {item.title}
                </h2>
                <p className="leading-7 text-center [&:not(:first-child)]:mt-6">
                  {item.body}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Link to="/">{item.button}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
        <section className="py-10">
          <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
            ¿Cómo adoptar?
          </h2>
          <div className="grid grid-cols-2">
            <AspectRatio ratio={4 / 3} className="w-xl mx-auto">
              {accItem === "acc-1" ? (
                <div className="w-full h-full rounded-lg
                bg-[url(https://images.pexels.com/photos/34311008/pexels-photo-34311008.jpeg)]
                bg-cover bg-no-repeat bg-center" />
              ) : accItem === "acc-2" ? (
                <div className="w-full h-full rounded-lg
                bg-[url(https://images.pexels.com/photos/32452143/pexels-photo-32452143.jpeg)]
                bg-cover bg-no-repeat bg-center" />
              ) : accItem === "acc-3" ? (
                <div className="w-full h-full rounded-lg
                bg-[url(https://images.pexels.com/photos/26263124/pexels-photo-26263124.jpeg)]
                bg-cover bg-no-repeat bg-center" />
              ) : (
                <div className="w-full h-full rounded-lg
                bg-[url(https://images.pexels.com/photos/12917058/pexels-photo-12917058.jpeg)]
                bg-cover bg-no-repeat bg-center" />
              )}
            </AspectRatio>
            <div className="flex flex-col justify-center pr-10">
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="acc-1"
                onValueChange={accordionHandler}
              >
                <AccordionItem value="acc-1">
                  <AccordionTrigger className="font-semibold text-xl">Busca tu compañero</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <p className="leading-7 text-base [&:not(:first-child)]:mt-6">
                      Accede al catalogo de animales para buscar el proximo acompañante en tu vida. Puedes buscar por especie o raza para hacer más facil la búsqueda de la mascota que quieres.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="acc-2">
                  <AccordionTrigger className="font-semibold text-xl">Postulate</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <p className="leading-7 text-base [&:not(:first-child)]:mt-6">
                      Una vez encuentres la mascota ideal puedes postularte con tus datos para ponerte en contacto con la persona o la fundación correspondiente.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="acc-3">
                  <AccordionTrigger className="font-semibold text-xl">Adopta un compañero de vida</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <p className="leading-7 text-base [&:not(:first-child)]:mt-6">
                      Despúes de postularte sigues tu proceso de adopción con la persona o fundación correspondiente, para finalmente adoptar a tu proximo compañero de vida.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <p className="text-destructive leading-7 font-semibold [&:not(:first-child)]:mt-6">
                AdoptaNet nunca te va a pedir plata durante el proceso de adopción de una mascota.
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
export default App;
