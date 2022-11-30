import { Router } from "express"

export default () => {
    const router = Router()

    router.get("/hello-product", async (req, res) => {
        const productService = req.scope.resolve("productService")

        const [product] = await productService.list()

        res.json({
            message: `Welcome to ${product.title}!`
        })
    })

    return router;
}