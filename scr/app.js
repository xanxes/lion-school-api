const { Router } = require('express')

//import das funcoes
const {getCursos, getCurso} = require('../modulo/cursos')
const {getAlunos, getAluno, getStatusAluno, getDisciplinaAluno, getAlunoPorAno, getAlunoPorAnoFiltro, getAnoDeConclusao, getStatusAlunoFiltro, filtroAno, filtroStatus} = require('../modulo/alunos')

//import da biblioteca express
const express = require('express');

//import da biblioteca cors para manipular as permissoes do protocalo http
const cors = require('cors');

//import da biblioteca body parser que irá manipular o corpo da requisicoes do protocolo http
const bodyParser = require('body-parser');

const { request, response } = require('express');

const app = express();
const routes = Router();

//Dando permissoes
routes.use((request, response, next) => {
    response.header(`Access-Control-Allow-Origin`, `*`)
    response.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`)
    app.use(cors())
    next()
})

//EndPoint - Todos os Cursos
routes.get('/course', cors(), async (request, response, next) => {
    let courses = getCurso()

    if (courses) {
        response.status(200);
        response.json(courses);
    } else {
        response.status(404);
    }
});

//EndPoint - Listagem de curso por sigla
routes.get('/cursos/:sigla', cors(), async function(request, response, next){

    let sigla =  request.params.sigla;
    let curso = getCursos(sigla);

    if(curso){
        response.status(200);
        response.json(curso);
    }else{
        response.status(404)
    }

})

//EndPoint - Listagem de todos os alunos de cada curso pela sigla
routes.get('/alunos/:sigla', cors(), async function(request, response, next){

    let sigla =  request.params.sigla;
    let curso = getAlunos(sigla);

    if(curso){
        response.status(200);
        response.json(curso);
    }else{
        response.status(404)
    }

})

//EndPoint - Listagem dos alunos de cada curso com sua situacao
routes.get('/alunos/status/:status', cors(), async (request, response, next) => {
    const { status } = request.params;
    
    const studentsList = getStatusAluno(status);

    if (studentsList) {
        response.status(200).json(studentsList);
    } else {
        response.status(404);
    }
});


//EndPoint - Listagem das disciplinas do aluno pelo numero da matricula
routes.get('/disciplinas/:sigla', cors(), async function(request, response, next){

    let sigla =  request.params.sigla;
    let curso = getDisciplinaAluno(sigla);

    if(curso){
        response.status(200);
        response.json(curso);
    }else{
        response.status(404)
    }

})


//EndPoint - informacoes do aluno pelo numero da matricula
routes.get('/aluno/:matricula', cors(), async (request, response, next) => {
    const studentEnrollment = request.params.matricula;
    const studentInfo = getAluno(studentEnrollment);

    if (studentInfo) {
        response.status(200).json(studentInfo);
    } else {
        response.status(404);
    }
});

// Endpoint - lista alunos a partir do ano de conclusao
routes.get('/alunos/conclusao/:data', cors(), async (request, response, next) => {
    const { data } = request.params;
    
    const studentsList = getAlunoPorAno(data);

    if (studentsList) {
        response.status(200).json(studentsList);
    } else {
        response.status(404);
    }
});

//EndPoint - lista os anos de conclusao
routes.get('/conclusao/?', cors(), async (request, response, next) => {
    const { curso, status } = request.query;

    const conclusionYears = getAnoDeConclusao(curso, status);

    if (conclusionYears) {
        response.status(200).json(conclusionYears);
    } else {
        response.status(500);
    }
});


// EndPoint - lista todos os alunos de um curso
routes.get('/alunos/:sigla/', function(request, response, next) {
    let curso = request.params.sigla
    let status = request.query.status
    let ano = request.query.ano

    let alunos = filtroAno(curso, status, ano)

    if(alunos) {
        response.status(200)
        response.json(alunos)
    }
    else {
        response.status(404)
    }
})

app.use('/.netlify/functions/api',routes);

//Start da API
app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes.');
})