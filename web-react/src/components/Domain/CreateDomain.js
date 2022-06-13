import React from 'react'
import { gql, useMutation } from '@apollo/client'
import './CreateDomain.css'
import { withStyles } from '@material-ui/core/styles'
import {
    Paper,
    TextField,
    Button,
    Typography,
} from '@material-ui/core'
import Title from '../Title'
import { Link } from 'react-router-dom'


const styles = (theme) => ({
    root: {
        maxWidth: 700,
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        margin: 'auto',
    },
    textField: {
        margin: theme.spacing(2),
        minWidth: 300,
    },
    submitButton: {
        margin: theme.spacing(2)

    },
    navLink: {
        textDecoration: 'none',
        color: 'inherit',
    }
})

const CREATE_DOMAIN = gql`
 mutation userCreateMutationQuery($input: [DomainCreateInput!]!){
 createDomains(input: $input) {
    domains {
      domainId
      name
      description
    }
  }
 }
 
 
`
function CreateDomain(props) {
    const { classes } = props
    const [domainId, setDoaminId] = React.useState("")
    const [domainName, setDomainName] = React.useState("")
    const [domainDescription, setDomainDescription] = React.useState("")


    const [createDomains, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_DOMAIN,
        { variables: { input: { name: domainName, description: domainDescription } } })





    const onDomainNameChange = (e) => {
        const domainName = e.target.value
        setDomainName(domainName)
    }

    const onDomainDesChange = (e) => {
        const domainDes = e.target.value
        setDomainDescription(domainDes)
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        createDomains()
        console.log(mutationError)
        console.log(mutationLoading)
        if (!mutationError) {
            setDomainName("")
            setDomainDescription("")
            setDoaminId(mutationData)
        }

    }



    return (
        <Paper className={classes.root}>
            <div className='title-container'>
                <Title>
                    Create Domain
                </Title>
                <Link to="/domain" className={classes.navLink}> <Button color="primary" variant="outlined" >
                    Domain List
                </Button></Link>
            </div>

            <p className={domainId ? 'Success-message' : 'hidden-message'}>{`Domain with domainId ${domainId} is created`}</p>

            <form onSubmit={handlerSubmit}>

                <Typography>
                    <TextField className={classes.textField} required label="Domain Name" onChange={onDomainNameChange} value={domainName}>
                    </TextField>
                </Typography>
                <Typography>
                    <TextField className={classes.textField} required label="Domain Description" onChange={onDomainDesChange} value={domainDescription}>
                    </TextField>
                </Typography>

                <Button className={classes.submitButton} type='submit' color='primary'>
                    Create Domain
                </Button>
            </form>
        </Paper>
    )
}

export default withStyles(styles)(CreateDomain)