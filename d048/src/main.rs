use std::io::{self, Write};

fn main() {
    println!("===== Verifique se é uma anagrama =====");

    print!("Anagrama 1: ");
    let anagrama1 = get_expression();

    print!("Anagrama 2: ");
    let anagrama2 = get_expression();

    let result = are_anagrames(anagrama1, anagrama2);

    println!("{}", match result {
        true => "Eles são anagramas",
        false => "Eles não são anagramas"
    });
}

fn are_anagrames(anagram1: String, anagrama2: String) -> bool {
    let chars_of_anagram_1: Vec<char> = anagram1
        .trim().to_lowercase().replace(" ", "")
        .chars().collect();
    let mut chars_of_anagram_2: Vec<char> = anagrama2
        .trim().to_lowercase().replace(" ", "")
        .chars().collect();

    if chars_of_anagram_1.len() != chars_of_anagram_2.len() {
        return false;
    }

    for char in chars_of_anagram_1 {
        let char_in_anagrama_2_index = chars_of_anagram_2.iter()
            .position(|x| *x == char);

        match char_in_anagrama_2_index {
            None => {
                return false
            },
            Some(val) => {
               chars_of_anagram_2.remove(val); 
            }
        };
    }

    return true;
}

fn get_expression() -> String {
    let mut expression: String = String::new();

    io::stdout().flush().unwrap();
    io::stdin()
        .read_line(&mut expression)
        .expect("Erro na expressão");

    return expression;
}