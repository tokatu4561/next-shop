import type { GetStaticProps, NextPage } from "next";
import { Button } from "../components/Button";
import { Field } from "../components/Filed";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";

const SignIn: NextPage = () => {
  return (
    <Layout title="Sign In">
      <form>
        <Field label="Email">
          <Input type="email" />
        </Field>
        <Field label="Password">
          <Input type="password" />
        </Field>
        <Button type="submit">Sign In</Button>
      </form>
    </Layout>
  );
};

export default SignIn;
