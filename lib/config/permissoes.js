module.exports = {
    1: {
        descricao: "Administrativo",
        link: false,
        icon: 'fas fa-lock',
        pai: 0
    },
    2: {
        descricao: "Operacional",
        link: false,
        icon: 'fas fa-briefcase',
        pai: 0
    },
    3: {
        descricao: "Relatórios",
        link: false,
        icon: 'fas fa-copy',
        pai: 0
    },
    4: {
        descricao: "Sistema",
        link: false,
        icon: 'fas fa-cogs',
        pai: 0
    },
    5: {
        descricao: "Perfil",
        link: false,
        icon: 'fas fa-user-shield',
        pai: 1
    },
    6: {
        descricao: "Perfis",
        link: "/perfis",
        icon: 'fas fa-user-shield',
        pai: 6
    },
    7: {
        descricao: "Novo Perfil",
        link: "/perfis/novo",
        icon: 'fas fa-user-shield',
        pai: 6
    },
    8: {
        descricao: "Empresas",
        link: "/admin/empresa",
        icon: 'fas fa-building',
        pai: 1
    },
    9: {
        descricao: "Consultar empresa",
        link: false,
        icon: 'fas fa-building',
        pai: 9
    },
    10: {
        descricao: "Nova empresa",
        link: false,
        icon: 'fas fa-building',
        pai: 9
    },
    11: {
        descricao: "Usuário",
        link: '/admin/usuario',
        icon: 'fas fa-user',
        pai: 1
    },
    12: {
        descricao: "Consultar usuários",
        link: false,
        icon: 'fas fa-user',
        pai: 12
    },
    13: {
        descricao: "Novo usuário",
        icon: 'fas fa-user-plus',
        link: false,
        pai: 12
    },
    14: {
        descricao: "Alterar a senha",
        link: "/usuario/alterarsenha",
        icon: 'fas fa-users-cog',
        pai: 5
    },
    15: {
        descricao: "Sair",
        link: "/logoff",
        icon: 'fas fa-sign-out-alt',
        pai: 5
    },
    16: {
        descricao: "Trocar de empresa",
        menu: true
    },
    11: {
        descricao: "Categorias",
        link: '/operacional/categoria',
        icon: 'fas fa-tags',
        pai: 2
    },
    12: {
        descricao: "Subcategorias",
        link: '/operacional/subcategoria',
        icon: 'fas fa-user',
        pai: 2
    },
    13: {
        descricao: "Tipos de produtos",
        link: '/operacional/tipoproduto',
        icon: 'fas fa-user',
        pai: 2
    },
    14: {
        descricao: "Produtos",
        link: '/operacional/produto',
        icon: 'fas fa-user',
        pai: 2
    },
}