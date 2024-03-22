import { CardContainer } from './styles'

type CardProbs = {
  text: string
  id: string
}

export const Card = ({ text }: CardProbs) => {
  return <CardContainer>{text}</CardContainer>
}
