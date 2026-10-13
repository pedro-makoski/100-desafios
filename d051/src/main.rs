use std::{collections::HashMap, io::{self, Write}};

const TOTAL_NOTAS: usize = 11;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
enum Nota {
    Moeda10Cent,
    Moeda25Cent,
    Moeda50Cent,
    Moeda1Real,
    Nota2Real,
    Nota5Real,
    Nota10Real,
    Nota20Real,
    Nota50Real,
    Nota100Real,
    Nota200Real,
}

fn main() {
    println!("=== Vamos cálcular o troco mínimo ===");

    print!("Digite o valor: R$ ");

    let val: f32 = get_double();

    let notas = calculate_notas(val);

    log_values(notas);
}

fn log_values(notas: HashMap<Nota, u32>) {
    let notas_ordered = get_all_notas_ordered();

    for nota in notas_ordered {
        if let Some(quant) = notas.get(&nota) {
            if *quant > 0 {
                println!("{}x de {}", quant, get_string_from_notas(&nota))
            }
        }
    }
}

fn get_string_from_notas(nota: &Nota) -> &'static str {
    match nota {
        Nota::Moeda10Cent => "10 centavos",
        Nota::Moeda25Cent => "25 centavos",
        Nota::Moeda50Cent => "50 centavos",
        Nota::Moeda1Real => "1 real",
        Nota::Nota2Real => "2 reais",
        Nota::Nota5Real => "5 reais",
        Nota::Nota10Real => "10 reais",
        Nota::Nota20Real => "20 reais",
        Nota::Nota50Real => "50 reais",
        Nota::Nota100Real => "100 reais",
        Nota::Nota200Real => "200 reais",
    }
}

fn calculate_notas(val: f32) -> HashMap<Nota, u32> {
    let mut final_val = val;

    let mut res: HashMap<Nota, u32> = HashMap::with_capacity(TOTAL_NOTAS);
    let mut notas = get_all_notas_ordered();

    notas.reverse();

    for nota in notas {
        let val = get_value_of_nota(&nota);

        res.insert(nota.clone(), 0);

        while final_val-val >= 0f32 {
            let before = res.get(&nota).unwrap();
    
            res.insert(nota.clone(), before+1);

            final_val -= val;
        }
    }

    res
}


fn get_all_notas_ordered() -> [Nota; TOTAL_NOTAS] {
    return [
        Nota::Moeda10Cent,
        Nota::Moeda25Cent,
        Nota::Moeda50Cent,
        Nota::Moeda1Real,
        Nota::Nota2Real,
        Nota::Nota5Real,
        Nota::Nota10Real,
        Nota::Nota20Real,
        Nota::Nota50Real,
        Nota::Nota100Real,
        Nota::Nota200Real,
    ];
}

fn get_value_of_nota(nota: &Nota) -> f32 {
    match nota {
        Nota::Moeda10Cent => 0.1,
        Nota::Moeda25Cent => 0.25,
        Nota::Moeda50Cent => 0.5,
        Nota::Moeda1Real => 1f32,
        Nota::Nota2Real => 2f32,
        Nota::Nota5Real => 5f32,
        Nota::Nota10Real => 10f32,
        Nota::Nota20Real => 20f32,
        Nota::Nota50Real => 50f32,
        Nota::Nota100Real => 100f32,
        Nota::Nota200Real => 200f32,
    }
}

fn get_double() -> f32 {
    let mut input: String = String::new();

    io::stdout().flush().unwrap();

    io::stdin()
        .read_line(&mut input)
        .expect("Falha ao ler linha");

    let numero: f32 = match input.trim().parse() {
        Ok(num) => num,
        Err(_) => {
            panic!("Número inválido");
        }
    };

    return numero;
}
