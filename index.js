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

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})