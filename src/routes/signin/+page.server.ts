import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { commercyfyUnwrap } from "commercyfy-core-js";

export const actions: Actions = {
  signin: async ({ request, locals, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return fail(400, { error: "email and password are required fields" });
    }

    const signin = await locals.commercyfyConnection.signinPortalUser(
      email as string,
      password as string,
    );
    if (commercyfyUnwrap(signin)) {
      throw error(400, signin.error);
    }

    cookies.set("x-commercyfy-core-jwt", signin.jwt, { path: "/" });
    return { jwt: signin.jwt };
  },
};
