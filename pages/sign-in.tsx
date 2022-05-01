import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import { Field } from "../components/Filed";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { fetchJson } from "../lib/api";

const SignIn: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(false);
    setLoading(true);

    try {
      const response = await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      setError(true);
      setLoading(false);
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
        {error && (
          <p className="text-red-700">
            メールアドレス、もしくはパスワードが間違っています。
          </p>
        )}
        {loading ? <p>Loading ...</p> : <Button type="submit">Sign In</Button>}
      </form>
    </Layout>
  );
};

export default SignIn;
