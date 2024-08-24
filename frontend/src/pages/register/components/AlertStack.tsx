import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'
import { Severity } from '../types'

type Props = {
  messages: string[]
  severity?: Severity
}

function AlertStack({ messages, severity = 'error' }: Props) {
  return (
    <Collapse in={Boolean(messages.length)}>
      <Stack>
        {messages.map(message => (
          <Alert variant="filled" severity={severity}>
            {message}
          </Alert>
        ))}
      </Stack>
    </Collapse>
  )
}

export default AlertStack
