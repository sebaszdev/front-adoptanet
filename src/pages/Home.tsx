import { Cat, Dog, Mail, UserRoundCheck, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import acc1Img from "@/assets/acc-1-img.jpeg";
import acc2Img from "@/assets/acc-2-img.jpeg";
import acc3Img from "@/assets/acc-3-img.jpeg";
import accDefaultImg from "@/assets/acc-default-img.jpeg";
import heroImg from "@/assets/hero-img.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/context/useAuth";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [accItem, setAccItem] = useState<"acc-1" | "acc-2" | "acc-3">("acc-1");

  const cards = [
    {
      icon: <Dog size={64} color="#733E04" className="mx-auto" />,
      title: "Explora nuestro catalogo de animales",
      body: "Explora nuestro catalogo de animales para encontrar a tu proximo compañero de vida",
      route: "/catalog",
      button: "Ir a catalogo",
    },
    {
      icon: <UserRoundCheck size={64} color="#1E66F5" className="mx-auto" />,
      title: "Inicia sesión",
      body: "¿Ya tienes una cuenta? Inicia sesión para empezar a ver animales que estan esperando un nuevo hogar",
      route: "/login",
      button: "Iniciar sesión",
    },
    {
      icon: <UserRoundPlus size={64} color="#D20F39" className="mx-auto" />,
      title: "Registrate",
      body: "¿No tienes una cuenta? Registrate para empezar a interactuar con rescatistas y fundaciones",
      route: "/signup",
      button: "Registrarse",
    },
  ];

  const authenticatedCards = [
    {
      icon: <Dog size={64} color="#733E04" className="mx-auto" />,
      title: "Explora nuestro catalogo de animales",
      body: "Explora nuestro catalogo de animales para encontrar a tu proximo compañero de vida",
      route: "/catalog",
      button: "Ir a catalogo",
    },
    {
      icon: <Cat size={64} color="#1E66F5" className="mx-auto" />,
      title: "Publica un animal",
      body: "Publica un animal para que muchas personas puedan verlo y adoptarlo",
      route: "/animals",
      button: "Publicar un animal",
    },
    {
      icon: <Mail size={64} color="#D20F39" className="mx-auto" />,
      title: "Revisa tus solicitudes",
      body: "Revisa las solicitudes que las personas interesadas hacen a tus animales publicados",
      route: "/animals",
      button: "Revisar solicitudes",
    },
  ];

  const accordionHandler = (value: "acc-1" | "acc-2" | "acc-3") => {
    setAccItem(value);
  };

  return (
    <>
      <div className="w-full">
        <AspectRatio ratio={4 / 1}>
          <div
            className="w-full h-full flex flex-col flex-wrap justify-end pb-10
              bg-cover bg-no-repeat bg-center border-b-10"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <h1 className="scroll-m-20 text-center text-background text-6xl font-extrabold tracking-tight text-balance">
              AdoptaNet
            </h1>
            <p className="text-center leading-7 text-background [&:not(:first-child)]:mt-6">
              Encuentra tu proximo mejor amigo
            </p>
          </div>
        </AspectRatio>
      </div>
      <section className="bg-muted flex flex-wrap justify-center pt-30 pb-20 gap-10">
        {!isAuthenticated
          ? cards.map(card => (
              <Card
                key={card.title}
                className="w-full max-w-sm flex flex-col justify-between hover:-translate-y-2"
              >
                <CardHeader>{card.icon}</CardHeader>
                <CardContent>
                  <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
                    {card.title}
                  </h2>
                  <p className="leading-7 text-center [&:not(:first-child)]:mt-6">
                    {card.body}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full active:scale-95" asChild>
                    <Link to={card.route}>{card.button}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          : authenticatedCards.map(card => (
              <Card
                key={card.title}
                className="w-full max-w-sm flex flex-col justify-between hover:-translate-y-2"
              >
                <CardHeader>{card.icon}</CardHeader>
                <CardContent>
                  <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
                    {card.title}
                  </h2>
                  <p className="leading-7 text-center [&:not(:first-child)]:mt-6">
                    {card.body}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full active:scale-95" asChild>
                    <Link to={card.route}>{card.button}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
      </section>
      <section className="py-10 flex flex-col gap-y-10">
        <h2 className="scroll-m-20 pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0">
          ¿Cómo adoptar?
        </h2>
        <div className="grid grid-cols-2">
          <AspectRatio ratio={4 / 3} className="w-xl mx-auto">
            {accItem === "acc-1" ? (
              <img
                src={acc1Img}
                className="w-full h-full object-cover rounded-lg"
                alt="Perros detras de una reja"
              />
            ) : accItem === "acc-2" ? (
              <img
                src={acc2Img}
                className="w-full h-full object-cover rounded-lg"
                alt="Perrp sosteniendo un cartel que tiene escrito 'ADOPTAME'"
              />
            ) : accItem === "acc-3" ? (
              <img
                src={acc3Img}
                className="w-full h-full object-cover rounded-lg"
                alt="Una mujer cargando y besando a un cachorro"
              />
            ) : (
              <img
                src={accDefaultImg}
                className="w-full h-full object-cover rounded-lg"
                alt="Perro en una jaula sonriendo a la camara"
              />
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
                <AccordionTrigger className="font-semibold text-xl">
                  Busca tu compañero
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <p className="leading-7 text-base [&:not(:first-child)]:mt-6">
                    Accede al catalogo de animales para buscar el proximo
                    acompañante en tu vida. Puedes buscar por especie o raza
                    para hacer más facil la búsqueda de la mascota que quieres.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="acc-2">
                <AccordionTrigger className="font-semibold text-xl">
                  Postulate
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <p className="leading-7 text-base [&:not(:first-child)]:mt-6">
                    Una vez encuentres la mascota ideal puedes postularte con
                    tus datos para ponerte en contacto con la persona o la
                    fundación correspondiente.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="acc-3">
                <AccordionTrigger className="font-semibold text-xl">
                  Adopta un compañero de vida
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <p className="leading-7 text-base [&:not(:first-child)]:mt-6">
                    Despúes de postularte sigues tu proceso de adopción con la
                    persona o fundación correspondiente, para finalmente adoptar
                    a tu proximo compañero de vida.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <p className="text-destructive leading-7 font-semibold [&:not(:first-child)]:mt-6">
              AdoptaNet nunca te va a pedir plata durante el proceso de adopción
              de una mascota.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
