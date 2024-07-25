import  { useState } from "react";
import { NovelEditor } from "./NovelEditor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BlogEditor = ()=>{
    const [content,setContent] = useState<string|"">("");
    const navigate  = useNavigate();
    async function post()
    {
        swal({
            title: "Are you sure you want to post?",
            icon: "warning",
            buttons : ["Yes","No"],
            dangerMode: true,
          })
          .then(async (willPost) => {
            if (!willPost) {
                if(content != "<p></p>")
                    {
                        const headers = {
                            'Authorization': localStorage.getItem("token")
                        };
                        
                        const base_url = import.meta.env.VITE_API_BASE_URL;
                        const blog = findTitleAndDescription(content);
            
                        const payload = {
                            title : blog.title,
                            content : blog.description
                        };
            
                        await axios.post(`${base_url}/blog`,payload,{headers}).then((r)=>{
                            navigate(`/blog/${r.data.PostId}`);
                        });
            
                    }
                    else
                    {
                        console.log("empty");
                    }
              swal("Poof! Your blog has been posted!", {
                icon: "success",
              });
            }
          });
       
            
    }

    return <>
        <div style={{ height: '300px', width:'900px' }}>
          < NovelEditor setContent={setContent} />
            <div className="flex justify-center py-12">
                <button className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-6 rounded" onClick={post}>
                    Post
                </button>
            </div>
        </div>
        
    </>

function findTitleAndDescription(htmlString: string): { title: string | null, description: string } {
  // Create a new DOM parser
  const parser = new DOMParser();
  // Parse the HTML string into a document
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Try to find the first <h1>
  let titleElement = doc.querySelector('h1');
  if (!titleElement) {
    // If no <h1>, try to find the first <h2>
    titleElement = doc.querySelector('h2');
  }
  if (!titleElement) {
    // If no <h1>, try to find the first <h3>
    titleElement = doc.querySelector('h3');
  }
  if (!titleElement) {
    // If no <h1>, try to find the first <p>
    titleElement = doc.querySelector('p');
  }

  // Get the text content of the found element or null if not found
  const title = titleElement? (titleElement.textContent?? '') : null;

  // Remove the title element from the document
  if (titleElement && titleElement.parentNode) {
    titleElement.parentNode.removeChild(titleElement);
  }

  // Get the inner HTML of the entire HTML string
  const body = doc.body;
  const innerHTML = body? body.innerHTML : '';

  // Calculate the description by trimming the inner HTML
  const description = innerHTML.trim();

  // Return an object with title and description
  return { title, description };
}
}