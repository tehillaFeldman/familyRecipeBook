import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

function Desserts() {

	const [desserts, setDesserts] = useState([]);

  	useEffect(() => {
    	getDesserts();
  	},[]);

  	const getDesserts= async () => {
      
    	//save fetched items to localStorage
    	const check = localStorage.getItem('desserts');
    	if(check){
      		setDesserts(JSON.parse(check));
    	}else{
      		//api call to get random popular recipes if there is nothing saved in localStorage
      		const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=dessert`);        const data = await api.json();
      		localStorage.setItem('desserts', JSON.stringify(data.recipes));
      		setDesserts(data.recipes);
      		console.log(data.recipes);
    	};
  	}

	return (
		<div>
    		{/* mapping through recipes and outputting */}
    		<Wrapper>
        		<h3>Desserts</h3>          
				<Splide 
					options={{
						perPage: 3,
						arrows: false,
						paginations: false,                
						drag: 'free',
						gap: '5rem',
					}}
				>
			
					{desserts.map((recipe) => {
						return(
							<SplideSlide key={recipe.id}>
								<Card>                     
									<Link to={'/recipe/' + recipe.id}>
										<Gradient>
											<p>{recipe.title}</p>
											<img src={recipe.image} alt={recipe.title}/>
										</Gradient>
									</Link>
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
	margin: 4rem 0rem;
`

const Card = styled.div`
	min-height: 25rem;
 	border-radius: 2rem;
  	overflow: hidden;
  	position: relative;

	img{
		border: 2px solid #cc3d3d;
		border-radius: 2rem;
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	p{
		position: absolute;
		z-index: 10;
		left: 50%;
		botttom: 0%;
		transform: translate(-50%, 0%);
		color: #c42121;
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 1rem;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const Gradient = styled.div`
	z-index: 3;
	position: absolute;
  	width: 100%;
  	height: 100%;
  	background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Desserts;
