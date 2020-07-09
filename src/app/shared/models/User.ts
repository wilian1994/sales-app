export class User {
  // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
  constructor(
    id?: string,
    nome?: string,
    email?: string,
    senha?: string,
    perfil?: string,
    business?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.perfil = perfil;
    this.business = business;
  }

  public id: string;
  public nome: string;
  public email: string;
  public senha: string;
  public perfil: string;
  public business: string;
}
