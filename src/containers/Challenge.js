import styled from "styled-components"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Editor from '../components/Editor'
import Footer from '../components/Footer'

export default class Challenge extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Are you ready?',
            body: '',
            funcName: '',
            solution: '',
            tests: [],
            view: 'instructions'
        }
        this.onChange = this.onChange.bind(this)   
    }

    componentDidMount() {
        axios.get('http://localhost:80/randomChallenge')
            .then(res => {
                let challenge = res.data
                this.setState({
                    title: challenge.title,
                    body: challenge.body,
                    solution: 'function ' + challenge.funcName + '(' + challenge.params + ')' + ' {\n\n}',
                    funcName: challenge.funcName,
                    tests: challenge.tests,
                })
            })
    }

    onChange (e) {
        this.setState({
            solution: e
        })
        console.log(this.state.solution);
    }

    changeView(view) {
        this.setState({
            view: view
        })
    }

    render() {
        let data = this.state
        console.log(this.props);
        let testResults = this.props.submitReducer.tests.map((test, i) => {
            let status
            if (test.status === 'pass') {
                return (
                    <PassResult>Input: ({test.input}). Expected: {test.expected}. Actual: {test.actual}.</PassResult>
                )
            } else {
                return (
                    <FailResult>Input: ({test.input}). Expected: {test.expected}. Actual: {test.actual}.</FailResult>                    
                )
            }
        })
        let panelBody = this.state.view === 'instructions' ? <Info>{this.state.body}</Info> 
            : this.state.view === 'results' ? <Info>{testResults}</Info> 
            : <p>other</p>

        return (
            <Layout>
                <Navbar {...this.props}/>
                <Body>
                    <Prompt>{this.state.title}</Prompt>
                    <EditorWrapper><Editor input={this.state.solution} change={this.onChange}/></EditorWrapper>
                    <ResultsPanel>
                        <TabContainer>
                            <Tab onClick={() => this.changeView('instructions')}>
                                Challenge
                            </Tab>
                            <Tab onClick={() => this.changeView('results')}> 
                                Results
                            </Tab>
                        </TabContainer>
                        {panelBody}
                        <Button onClick={e => this.props.submit(data)}>Submit</Button>
                    </ResultsPanel>
                </Body>
                <Footer/>
            </Layout>
        )
    }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: 75px 50px auto 10%;
  grid-template-columns: 5% auto 5%;
  grid-row-gap: 10px;
  background: grey;
`
const Body = styled.div`
  grid-row: 2 / 4;
  grid-column: 2;
  display: grid;
  grid-template-columns: auto auto;
`
const Prompt = styled.div`
  grid-row: 2;
  grid-column: 1 / 3;
  text-align: center;
  font-size: 45px;
  width: 100%;
  background: lightgrey;
  margin: 25px;
`
const EditorWrapper = styled.div`
  grid-row: 3;
  grid-column: 1;
`
const ResultsPanel = styled.div`
  grid-column: 2;
  grid-row: 2 / 4;
  background: azure;
  display: grid;
  grid-template-rows: 50px auto 40px;
  margin-top: 100px;
  min-width: 400px;
`
const TabContainer = styled.div`
  grid-row: 1;
  display: grid;
  grid-template-columns: auto auto;
  background: darkgrey;
`
const Tab = styled.div`
  background: ghostwhite;
  font-size: 30px;
  justify-self: center;
  align-self: center;
`
const Info = styled.p`
  font-size: 20px;
`
const Button = styled.button`
  grid-row: 3;
  font-size: 30px;
`
const PassResult = styled.p`
  color: green;
`
const FailResult = styled.p`
  color: red;
`
