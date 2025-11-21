import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
      <CardHeader>
        <CardTitle>Crea una cuenta</CardTitle>
        <CardDescription>
              Ingresa tus datos para registrarte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre</FieldLabel>
              <Input id="name" type="text" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo electronico</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="usuario@ejemplo.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                    Debe ser al menos de 8 caracteres
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Crear cuenta</Button>
                <FieldDescription className="px-6 text-center">
                  ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}

