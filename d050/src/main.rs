use std::io::{self, Write};

const SEPARATOR: &'static str = ",";

fn main() {
    println!("Removedor de valores duplicados");
    
    print!("Digite os itens separados por vírgula: ");
    let text = get_string();
    let isolated = isolate(text);

    println!("Palavras únicas geradas com sucesso: ");
    println!("{}", isolated.join(SEPARATOR).to_string());
}

fn isolate(text: String) -> Vec<String> {
    let phrases: Vec<&str> = text.split(SEPARATOR).collect();
    let mut isolated: Vec<String> = Vec::new();

    for indice in 0..phrases.len() {
        let val = phrases[indice];
        let string_of = String::from(val);
    
        if !isolated.contains(&string_of) {
            isolated.push(string_of);
        }
    }

    return isolated;
} 

fn get_string() -> String {
    let mut text: String = String::new();

    io::stdout().flush().unwrap();
    io::stdin()
        .read_line(&mut text)
        .expect("Erro ao realizar input");

    return text.trim().to_string();
}
