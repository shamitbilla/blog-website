import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode, sign, verify} from 'hono/jwt'
import { SigninInput, SignupInput } from '@shamit/medium-common'
import { use } from 'hono/jsx'

const userRouter = new Hono<({
  Bindings : {
    DATABASE_URL : string;
    JWT_SECRET : string;
  },
  Variables : {
    userId : string;
  }
})>();

userRouter.get('/bulk',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const users = await prisma.user.findMany({});
  return c.json(users);
});



userRouter.post('/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const data  = await c.req.json();
  const v = SignupInput.safeParse(data);
  if (!v.success) {
    return c.json({
      msg: "Wrong Credential format",
    }, 400);
  }
  try
  {
  
    const user = await prisma.user.create({
      data:{
        email : data.email,
        name : data.name,
        password : data.password

      }
    });

    const token = await sign({id : user.id},c.env.JWT_SECRET);

    return c.json({
      msg : "Signup successful!",
      name : user.name,
      token
    });
    

  }
  catch(e){
    //@ts-ignore
    return c.text(e);
  }

});

userRouter.post('/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const data  = await c.req.json();
  const v = SigninInput.safeParse(data);
  if (!v.success) {
    return c.json({
      msg: "Wrong Credential format",
    }, 400);
  }
  try
  {
    const user = await prisma.user.findFirst({
      where:{
        email : data.email,
        password : data.password

      }
    });

    if(user)
    {
      const token = await sign({id : user.id},c.env.JWT_SECRET);

      return c.json({
        msg : "Signin successful!",
        name : user.name,
        token
      });
    }
    else
    {
      return c.json({
        msg : "Invalid Credentials"
      })
    }

  }
  catch(e){
    //@ts-ignore
    return c.text(e);
  }


});




export default userRouter
