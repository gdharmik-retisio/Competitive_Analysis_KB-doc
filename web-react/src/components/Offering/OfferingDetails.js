import React from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import './OfferingDetails.css'
import List from '../List'
import {
  Paper,
  Card,
  CardActions,
  Typography,
  Box,
  CardContent,
} from '@mui/material'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Heading from '../Heading'
/* import UpdateOffering from './UpdateOffering' */
import UpdateDomain from '../Domain/UpdateDomain'
import UpdateCompany from '../Company/UpdateCompany'

const GET_OFFERING = gql`
  query offeringsPaginateQuery($where: OfferingWhere) {
     offerings(where: $where) {
    id
    name
    description
    version
    primaryDomain {
      id
      name
      description
    }
    provider {
      id
      name
      description
    }
  }
  }
`

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} className="tabPanel">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function OfferingDetails() {
  const location = useLocation()
  const { id } = location.state
  const [primaryDomainData, setrimaryDomainData] = React.useState()
  const [companyData, setCompanyData] = React.useState("")
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setrimaryDomainData("")
    setCompanyData("")
  };

  const [open, setOpen] = React.useState(false);
  /* const [offeringData, setOfferingData] = React.useState("") */


  const { loading, data, error } = useQuery(GET_OFFERING, {
    variables: { where: { id: id } },
  })

  const onUpdateDomainClick = (n) => {
    setrimaryDomainData(n)
    setOpen(true)
  }

  const onUpdateComapnyClick = (n) => {
    console.log(n)
    setCompanyData(n)

    setOpen(true)
  }

  return (
    <div>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error {console.log(error)}</p>}
      {data && !loading && !error && (
        <div>
          {data.offerings.map((n, i) => {
            return (
              <div key={i}>
                <Paper className="root offeringDetails">
                  <Heading
                    title="Offering Details"
                    listType="list"
                    linkName="Offering List"
                  ></Heading>
                  <Card className="cardDetail">
                    <React.Fragment>
                      <CardContent className='cardContent'>
                        <Typography variant="body1" component="header" className='cardHeader'>
                          Name: {n.name}
                        </Typography>
                        <Typography variant="body1" component="desc">
                          Description: {n.description}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Typography variant="body1" component="desc">
                          Primary Domain: {data.offerings[i].primaryDomain.length}
                        </Typography>
                        <Typography variant="body1" component="desc">
                          Provider Company: {data.offerings[i].provider.length}
                        </Typography>

                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Paper>



                <Paper className="offeringDetails " >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Primary Domain" {...a11yProps(0)} />
                        <Tab label="Provider Company" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <List
                        data={data.offerings[i].primaryDomain}
                        title="Domain"
                        linkName="Create Offering"
                        loading={loading}
                        error={error}
                        onUpdateClick={onUpdateDomainClick}
                      />

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <List
                        data={data.offerings[i].provider}
                        title="Company"
                        linkName="Create Offering"
                        loading={loading}
                        error={error}
                        onUpdateClick={onUpdateComapnyClick}
                      />

                    </TabPanel>

                  </Box>
                  {primaryDomainData ? <UpdateDomain
                    open={open}
                    setOpen={setOpen}
                    domainData={primaryDomainData}
                  /> : ""}

                  {companyData ? <UpdateCompany
                    open={open}
                    setOpen={setOpen}
                    companyData={companyData}
                  /> : ""}
                </Paper>

              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OfferingDetails
