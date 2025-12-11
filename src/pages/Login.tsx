import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import type * as z from "zod";
import loginImg from "@/assets/login-img.jpeg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/useAuth";
import { LoginSchema } from "@/schemas/userSchema";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromProtected) {
      toast.warning("Inicia sesión para acceder");
    }
  }, [location.state]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const { correo, contrasena } = data;
      await login({ correo, contrasena });
      // si sale bien chao
      navigate("/");
    } catch (err) {
      if (err instanceof TypeError && err.message === "Failed to fetch")
        toast.error("Error con la API");
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div className="grid grid-cols-2 h-full">
      <AspectRatio ratio={16 / 9}>
        <img
          src={loginImg}
          className="absolute inset-0 h-full w-full object-cover"
          alt="Imagen de un gato con un casco de aviacion dentro de un avion"
        />
      </AspectRatio>
      <div className="flex flex-col">
        <div className="flex flex-col flex-1 items-center justify-center gap-y-2">
          <Card className="w-md">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                Inicia Sesión
              </CardTitle>
              <CardDescription className="text-center mb-2">
                Ingresa tu información para inicar sesión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-4">
                  <Controller
                    name="correo"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-login-correo">
                          Correo
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-login-correo"
                          aria-invalid={fieldState.invalid}
                          className="rounded-lg"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="contrasena"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-login-contrasena">
                          Contraseña
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-login-contrasena"
                          aria-invalid={fieldState.invalid}
                          className="rounded-lg"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </CardContent>
            <CardFooter>
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  form="form-login"
                  className="w-full cursor-pointer active:scale-95"
                >
                  Iniciar Sesión
                </Button>
              </Field>
            </CardFooter>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              ¿No tienes cuenta?{" "}
              <Link
                to="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
