import express from 'express'

const router = express()
const port = 3000

router.use(express.json())

let eventos = []

router.get("/eventos", (req, res) => {
    res.send(eventos)
})

router.get("/eventos/:id", (req, res) => {
    let id = Number(req.params.id)
    let indice = eventos.findIndex((evento) => evento.id === id)

    if (indice === -1) {
        return res.status(404).send({ erro: 'Evento não encontrado' })
    }

    res.send(eventos[indice])
})

router.post('/eventos', (req, res) => {
    let nome = req.body.nome
    let local = req.body.local
    let vagas = req.body.vagas

    if (!nome || !local || !vagas) {
        return res.status(400).send({ erro: "Informe nome, local e vagas" })
    }

    let id = 1
    if (eventos.length > 0) {
        id = eventos[eventos.length - 1].id + 1
    }

    let evento = { id: id, nome: nome, local: local, vagas: vagas }
    eventos.push(evento)
    res.status(201).send(evento)
})

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})