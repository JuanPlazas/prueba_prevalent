import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()

  if (session) { // si no es admin no puede ingresar
    router.push("/")
  }

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive"
      })
    } else {
      router.push('/')
    }
  });

  const handleSignInAuth0 = async () => {
    const res = await signIn("auth0", { callbackUrl: "/" });

    if (res?.error) {
      toast({
        title: "Error",
        description: res.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-full">
        <h1 className="font-bold text-4xl mb-4">Login</h1>

        <label htmlFor="email" className="mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "El Email es requerido",
            },
          })}
          className="p-3 rounded block mb-2 w-full border"
          placeholder="test@test.com"
        />

        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="mb-2 block text-sm">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña en requerida",
            },
          })}
          className="p-3 rounded block mb-2 w-full border"
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button
          className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2"
          type="submit"
        >
          Login
        </button>

        <button
          onClick={() => handleSignInAuth0()}
          className="w-full bg-gray-500 text-white p-3 rounded-lg mt-2"
          type="button"
        >
          Login with Auth0
        </button>
      </form>
    </div>
  );
}
export default LoginPage;
