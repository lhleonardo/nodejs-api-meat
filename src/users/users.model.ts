const usuarios = [
    { id: '1', name: "Leonardo Braz", email: "lhleonardo05@gmail.com" },
    { id: '2', name: "Kleissy", email: "kleissy@gmail.com" }
];

export class Users {
    public static findAll(): Promise<any[]> {
        return Promise.resolve(usuarios);
    }

    public static findById(id: string): Promise<any> {
        let filtro = usuarios.filter((user) => user.id === id);

        if (filtro.length == 0 || filtro.length > 1) {
            return Promise.reject();
        }

        return Promise.resolve(filtro[0])
    }
}