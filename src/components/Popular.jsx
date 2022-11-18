import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  },[]);

  //api call to get random popular recipes
    const getPopular = async () => {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
      const data = await api.json();
      setPopular(data.recipes);
      console.log(data.recipes);
    }

    return (
    <div>
      {/* mapping through recipes and outputting */}
        return(
          <Wrapper>
            <h3>Popular Picks</h3>
            <Splide 
              options={{
                perPage: 4,
                arrows: false,
                paginations: false,
                drag: 'free',
                gap: '5rem',
              }}
            >
              {popular.map((recipe) => {
                return(
                  <SplideSlide>
                    <Card>
                      <p>{recipe.title}</p>
                      <img src={recipe.image} alt={recipe.title}/>
                    </Card>
                  </SplideSlide>
                );
              })}
            </Splide>
          </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
margin: 4 rem 0rem;
`;

const Card = styled.div`
  min-height: 2rem;
  border-radius: 2rem;
  overflow: hidden;

  img{
    border-radius: 2rem;
  }
`;

export default Popular;