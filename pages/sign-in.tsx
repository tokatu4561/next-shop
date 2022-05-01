import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { Field } from "../components/Filed";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { useSignIn } from "../hooks/user";
import { fetchJson } from "../lib/api";

const SignIn: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isError, isLoading, signIn } = useSignIn();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const valid = signIn(email, password);
    if (valid) {
      router.push("/");
    }
  };

  return (
    <Layout title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>
        {isError && (
          <p className="text-red-700">
            メールアドレス、もしくはパスワードが間違っています。
          </p>
        )}
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Layout>
  );
};

export default SignIn;
