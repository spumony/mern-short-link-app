import React, {useState, useContext} from 'react';
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {Container, Row, Col, FormGroup, Label, Input} from 'reactstrap'

const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <Container>
      <Row>
        <Col className="mt-3">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="link" className="mr-sm-2">Insert your link</Label>
            <Input
              type="link"
              name="link"
              id="link"
              placeholder="Add link"
              value={link}
              onChange={e => setLink(e.target.value)}
              onKeyPress={pressHandler}
            />
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePage;
