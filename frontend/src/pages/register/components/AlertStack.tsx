import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import Stack from '@mui/material/Stack'

type Props = {
  errors: string[]
}

function AlertStack({ errors }: Props) {
  return (
    <Collapse in={Boolean(errors.length)}>
      <Stack>
        {errors.map(error => (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        ))}
      </Stack>
    </Collapse>
  )
}

export default AlertStack
