use std::io;

fn main() {
    println!("Digite uma expressão qualquer e verifique se os 
            (), [] e {{}} estão alocado corretamente ");
    
    println!("Sua expressão: ");

    let expression = get_expression();

    let validation = is_valid_expression(expression);

    println!("Sua expressão possui um fechamento {}", 
        if validation {"equilibrado"} else {"desequilibrado"});
}

fn get_expression() -> String {
    let mut expressao: String = String::new();

    io::stdin()
        .read_line(&mut expressao)
        .expect("Erro ao ler entrada");

    return expressao;
}

fn is_valid_expression(expression: String) -> bool {
    let mut open_items: Vec<char> = Vec::new();
    let string_chars: Vec<char> = expression.chars().collect();
    
    for char in string_chars {
        if is_opening(char) {
            open_items.push(char);
        }

        if is_closing(char) {
            let last_element: Option<&char> = open_items.last();

            match last_element {
                None => {
                    return false
                },
                Some(val) => {
                    let closing = get_equivalent_closing_to_open(*val);

                    open_items.pop();
                    if closing != char {
                        return false
                    }
                }
            }
        }
    }

    return open_items.len() == 0;
}

fn is_opening(char: char) -> bool {
    match char {
        '{' | '[' | '(' => true,
        _ => false
    }
}

fn get_equivalent_closing_to_open(open: char) -> char {
    match open {
        '{' => '}',
        '[' => ']',
        '(' => ')',
        _ => ' '
    }
}

fn is_closing(char: char) -> bool {
    match char {
        '}' | ']' | ')' => true,
        _ => false
    }
}