import moment from "moment";
import { colors } from "../../styles/colors";

export const appointments = [
  {
    date: moment(),
    city: 'Lago Sul',
    color: colors.red,
    description: 'Apresentar desafio'
  },
  {
    date: moment(),
    city: 'Aguas Claras',
    color: colors.red,
    description: 'Fisioterapia'
  },

  {
    date: moment().subtract(15, 'days').subtract(5, 'hours'),
    city: 'Lago Sul',
    color: colors.red,
    description: 'Consulta Tactus'
  },
  {
    date: moment().subtract(5, 'days').subtract(4, 'hours'),
    city: 'Taguatinga',
    color: colors.red,
    description: 'Comprar mercadoria'
  },
];

export const reminders = [
  {
    date: moment(),
    city: 'Aguas Claras',
    color: colors.primary,
    description: 'Receber Maquina de Lavar',
    reminder: true
  },
  {
    date: moment().subtract(20, 'days').subtract((3, 'hours')),
    city: 'Riacho Fundo 1',
    color: colors.primary,
    description: 'Verificar aluguel',
    reminder: true
  }
]
