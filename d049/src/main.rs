use std::{collections::HashMap, io::{self, Write}};

const TOTAL_SIMBOLS: usize = 36;

struct CodificationItens {
    normal_to_cripted: HashMap<char, char>,
    cripted_to_normal: HashMap<char, char>
}

enum ModeCodification {
    Crypt,
    UnCrypt,
}

fn main() {
    println!("==== Cifra de Cesar ====");

    let crypt_keys = get_codification_itens();

    loop {
        let mode = get_mode_of_program();

        print!("Digite o texto para realizar a operação: ");
        let text = get_string();

        let result = match mode {
            ModeCodification::Crypt => crypt(text, &crypt_keys),
            ModeCodification::UnCrypt => uncrypt(text, &crypt_keys)
        };

        println!("Resultado: {}", result);

        if !is_to_continue() {
            break;
        }
    }
}

fn crypt(text: String, items: &CodificationItens) -> String {
    return replace_on_hashmap(text, &items.normal_to_cripted);
}

fn uncrypt(text: String, items: &CodificationItens) -> String {
    return replace_on_hashmap(text, &items.cripted_to_normal);
}

fn replace_on_hashmap(text: String, hashmap: &HashMap<char, char>) -> String {
    let mut chars: Vec<char> = text.chars().collect();
    
    for indice in 0..chars.len() {
        let char_val = chars[indice];
        let equivalent_opt = hashmap.get(&char_val);
        let equivalent = match equivalent_opt {
            None => char_val,
            Some(res) => *res
        };

        chars[indice] = equivalent;
    }

    return chars.iter().collect();
}

fn get_mode_of_program() -> ModeCodification {
    loop {
        print!("Deseja Criptografar (C) ou descriptografar (D)? ");
        let mode = get_string().to_uppercase().chars().next().unwrap();

        if mode == 'C' || mode == 'D' {
            return match mode {
                'C' => ModeCodification::Crypt,
                'D' => ModeCodification::UnCrypt,
                _ => ModeCodification::Crypt
            };
        }

        println!("Caracter não identificado, tente novamente");
    }
}

fn get_codification_itens() -> CodificationItens {
    let simbols: [char; TOTAL_SIMBOLS] = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
            'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    println!("**** Codificação dos caracteres ****");

    let mut items: CodificationItens = CodificationItens { 
            normal_to_cripted: HashMap::with_capacity(TOTAL_SIMBOLS), 
            cripted_to_normal: HashMap::with_capacity(TOTAL_SIMBOLS) 
    };

    for simbol in simbols {
        print!("Digite o equivalente ao símbolo {} => ", simbol);

        let equivalent = get_string()
                .to_uppercase().chars().next().unwrap();

        items.normal_to_cripted.insert(simbol, equivalent);
        items.cripted_to_normal.insert(equivalent, simbol);
    }

    println!("Digitação dos equivalentes completada com sucesso!");

    return items;
}

fn is_to_continue() -> bool {
    print!("Deseja continuar(S/N)? ");
    let confirmation = get_string().to_uppercase();

    return confirmation != "N";
}

fn get_string() -> String {
    let mut text: String = String::new();

    io::stdout().flush().unwrap();
    io::stdin()
        .read_line(&mut text)
        .expect("Texto inválido");

    return text.trim().to_string();
}