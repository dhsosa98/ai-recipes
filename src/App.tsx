import { useState, useEffect } from 'react'
import { Container } from '@mui/system'
import Button from '@mui/material/Button'
import {Send, Kitchen} from '@mui/icons-material'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { giveMeARecipe } from './ai.service'
import appIcon from './icon.png'

const ingredients = [
  'chicken',
  'beef',
  'pork',
  'fish',
  'shrimp',
  'eggs',
  'milk',
  'cheese',
  'butter',
  'oil',
  'salt',
  'pepper',
  'onion',
  'garlic',
  'potato',
  'carrot',
  'tomato',
  'lettuce',
  'cucumber',
  'broccoli',
  'spinach',
  'apple',
  'orange',
  'banana',
  'strawberry',
  'blueberry',
  'rice',
  'pasta',
  'bread',
  'flour',
  'sugar',
  'cinnamon',
  'vanilla',
  'chocolate',
  'coffee',
].sort()

function App() {

  const [prompt, setPrompt] = useState<string>('')

  const [recipe, setRecipe] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])

  useEffect(()=> {
    setPrompt(createPrompt())
  }, [selectedIngredients.length])

  const createPrompt = () => {
    return new Intl.ListFormat('en-us', { style: 'long', type: 'conjunction' }).format([...selectedIngredients])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
    e.preventDefault()
    if (!prompt) {
      return
    }
    setLoading(true)
    const response = await giveMeARecipe(prompt)
    setRecipe(response)
    setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChangePrompt = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((selectedIngredient) => selectedIngredient !== ingredient))
      return
    }
    setSelectedIngredients((selectedIngredients) => [...new Set([...selectedIngredients, ingredient])])
  }

  const handleChangeTextField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value)
  }

  const textFieldValue = selectedIngredients.length>0 ? 'Your selected ingredients are: '+ prompt : ''


  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "#282c34",
      minHeight: '100vh',
      gap: '3rem',
      padding: '1rem',
      alignItems: 'center',
    }} maxWidth="md">
      <header className="text-center text-white font-normal text-2xl flex gap-2 flex-col justify-center items-center">
        <img src={appIcon} alt="app icon" className="inline-block sm:w-20 sm:h-20 h-16 rounded-xl" />
        <h6>
          AI Recipes 
        </h6>
      </header>
      <Box
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }} maxWidth="sm">
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
        {
          ingredients.map((ingredient, index) => {
            const isIngredientSelected = selectedIngredients.includes(ingredient)
            return (
            <Button
              key={index}
              variant={isIngredientSelected ? "contained" : "outlined"}
              className={"sm:!text-md !text-xs !font-normal " }
              onClick={() => handleChangePrompt(ingredient)}
            >
              {ingredient}
            </Button>
          )})
        }
        </Box>
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }} >
          <TextField multiline minRows={4} value={textFieldValue} size="medium" inputProps={{ className: "!text-white sm:!text-lg" }}  onChange={handleChangeTextField}/>
          <Button variant="contained" endIcon={<Send />} type="submit" disabled={loading} className='sm:!text-md !text-xs'>
          {!recipe ? "Generate Recipe!" : "Generate another one!"}
          </Button>
        </Box>
      </Box>
      {recipe && <Card sx={{
        padding: '1rem',
        backgroundColor: '#1e2127',
        color: 'white',
      }}>
        <TextField
          value={recipe}
          multiline
          minRows={4}
          inputProps={{ className: "!text-white !border-none !outline-none sm:!text-xl" }}
          sx={{
            width: '100%',
            border: 'none',
            backgroundColor: '#1e2127',
            color: 'white',
          }}
        />
      </Card>}
    </Container>
  )
}

export default App
