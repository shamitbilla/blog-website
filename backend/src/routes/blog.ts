import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import {verify} from 'hono/jwt'
import { CreatePostInput, UpdatePostInput } from '@shamit/medium-common';

const blogRouter = new Hono<({
  Bindings : {
    DATABASE_URL : string;
    JWT_SECRET : string;
  },
  Variables : {
    userId : string;
    prisma : PrismaClient
  }
})>();

blogRouter.use('*',async (c,next)=>{
  const header = c.req.header("Authorization") || "";
  if(header)
  {
    try
    {
      const response = await verify(header.split(" ")[1],c.env.JWT_SECRET);
      if(!response || typeof response.id !== 'string')
      {
        c.status(403);
        return c.json({
          msg : "Access Denied"
        });
      }
      c.set('userId',response.id);
      await next();
    }
    catch
    {
      c.status(403);
      return c.json({
        msg : "Access Denied"
      });
    }
    
      
  }
  else
  {
    c.status(403);
    return c.json({
      msg : "Access Denied"
    });
  }
  
});



blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL	,
}).$extends(withAccelerate());
  const posts = await prisma.post.findMany({
    select : {
      id : true,
      title : true,
      content : true,
      author : {
        select : {
          name : true
        }
      }
    }
  });
  return c.json(posts);
});


blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
    const postId = c.req.param('id');
    const post = await prisma.post.findUnique({
        where : {
            id : postId
        },
        select : {
          title : true,
          content : true,
          author : {
            select : {
              name : true
            }
            
          }
        }
    });

    return c.json(post);
 
});

blogRouter.delete('/:id', async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL	,
}).$extends(withAccelerate());

  const postId = c.req.param('id');
  const post = await prisma.post.delete({
      where : {
          id : postId
      },
      select : {
        id: true,
        title : true,
        content : true,
        author : {
          select : {
            name : true
          }
          
        }
      }
  });

  return c.json({
    msg :  `post with id ${post.id} is deleted`
  });

});


blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

    const userId = c.get('userId');
    const data = await c.req.json();
    const v = CreatePostInput.safeParse(data);
    if (!v.success) {
      return c.json({
        msg: "Incorrect data format",
      }, 400);
    }
    const post = await prisma.post.create({
        data : {
            title : data.title,
            content : data.content,
            authorId : userId
        }
    });

    return c.json({
        msg : "Blog Posted succesfully",
        PostId : post.id 
    });

})

blogRouter.put('/',async (c)=>{
  const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());

  const userId = c.get('userId');
  const data = await c.req.json();
  const v = UpdatePostInput.safeParse(data);
  if (!v.success) {
    return c.json({
      msg: "Incorrect data format",
    }, 400);
  }
  const post = await prisma.post.update({
      where : {
          id : data.id,
          authorId : userId
      },
      data : {
          title : data.title,
          content : data.content
      }
  })

  return c.json({
      msg : "Blog Updated succesfully",
      PostId : post.id 
  });

});


export default blogRouter
