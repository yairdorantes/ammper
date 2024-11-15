import axios from "axios";
import MyRouter from "./router/MyRouter";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BelvoApiUrl = import.meta.env.VITE_BELVO_API_URL;
const username = import.meta.env.VITE_BELVO_API_ID;
const password = import.meta.env.VITE_BELVO_API_PASSWORD;

const authHeader = "Basic " + btoa(username + ":" + password);
const banks = [
  {
    id: 9322,
    name: "belvo_mx_retail",
    type: "bank",
    code: null,
    website: null,
    display_name: "Belvo Mx Retail",
    country_code: "MX",
    country_codes: ["MX"],
    primary_color: "#0AB0D8",
    logo: null,
    icon_logo: null,
    text_logo: null,
    form_fields: [
      {
        name: "username",
        type: "number",
        label: "NIT",
        validation: "^[0-9]{1,15}$",
        placeholder: "1018470893",
        validation_message: "Credenciales incorrectas",
      },
      {
        name: "username2",
        type: "number",
        label: "Delay seconds",
        validation: "^[0-9]{1,6}$",
        placeholder: "10147593028",
        validation_message: "8 a 11 dígitos",
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        validation: "^.{1,}$",
        placeholder: "**********",
        validation_message: "Contraseña incorrecta",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: ["ACCOUNTS", "OWNERS"],
    openbanking_information: null,
  },
  {
    id: 1006,
    name: "erebor_br_retail",
    type: "bank",
    code: "1006",
    website: null,
    display_name: "Erebor Bank",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/erebor.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/erebor_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/erebor.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "Conta",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "Senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
    ],
    openbanking_information: null,
  },
  {
    id: 1005,
    name: "erebor_co_retail",
    type: "bank",
    code: "1005",
    website: null,
    display_name: "Erebor Bank",
    country_code: "CO",
    country_codes: ["CO"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/erebor.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/erebor_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/erebor.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "username",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "password",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
    ],
    openbanking_information: null,
  },
  {
    id: 1004,
    name: "erebor_mx_retail",
    type: "bank",
    code: "1004",
    website: null,
    display_name: "Erebor Bank",
    country_code: "MX",
    country_codes: ["MX"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/erebor.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/erebor_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/erebor.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "usuário",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "BALANCES",
      "INCOMES",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
    ],
    openbanking_information: null,
  },
  {
    id: 1012,
    name: "gotham_br_business",
    type: "bank",
    code: "1012",
    website: null,
    display_name: "Gotham Business Bank",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/gotham.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/gotham_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/gotham.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "Conta",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "Senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: ["ACCOUNTS", "TRANSACTIONS", "OWNERS", "BALANCES"],
    openbanking_information: null,
  },
  {
    id: 1003,
    name: "gringotts_br_retail",
    type: "bank",
    code: "1003",
    website: null,
    display_name: "Gringotts Bank",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/gringotts.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/gringotts_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/gringotts.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "Conta",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "Senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
    ],
    openbanking_information: null,
  },
  {
    id: 1002,
    name: "gringotts_co_retail",
    type: "bank",
    code: "1002",
    website: null,
    display_name: "Gringotts Bank",
    country_code: "CO",
    country_codes: ["CO"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/gringotts.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/gringotts_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/gringotts.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "usuário",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
    ],
    openbanking_information: null,
  },
  {
    id: 1001,
    name: "gringotts_mx_retail",
    type: "bank",
    code: "1001",
    website: null,
    display_name: "Gringotts Bank",
    country_code: "MX",
    country_codes: ["MX"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/gringotts.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/gringotts_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/gringotts.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "username",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "password",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "BALANCES",
      "INCOMES",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
    ],
    openbanking_information: null,
  },
  {
    id: 1020,
    name: "heimdall_br_retail",
    type: "bank",
    code: "1020",
    website: null,
    display_name: "Heimdall Bank (teste de MFA)",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/heimdall.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/heimdall_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/heimdall.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "Conta",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "Senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requer entre 1 e 16 caracteres",
      },
      {
        name: "token",
        type: "number",
        label: "Token",
        length: "6",
        optional: true,
        validation: "^\\d{6}$",
        validation_message: "Requiere 6 dígitos",
      },
    ],
    features: [
      {
        name: "token_required",
        description:
          "institution may need a token during link creation / login",
      },
    ],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
    ],
    openbanking_information: null,
  },
  {
    id: 1021,
    name: "heimdall_co_retail",
    type: "bank",
    code: "1021",
    website: null,
    display_name: "Heimdall Bank (Pruebas MFA)",
    country_code: "CO",
    country_codes: ["CO"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/heimdall.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/heimdall_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/heimdall.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "username",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "password",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "token",
        type: "number",
        label: "Token",
        length: "6",
        optional: true,
        validation: "^\\d{6}$",
        validation_message: "Requiere 6 dígitos",
      },
    ],
    features: [
      {
        name: "token_required",
        description:
          "institution may need a token during link creation / login",
      },
    ],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
    ],
    openbanking_information: null,
  },
  {
    id: 1014,
    name: "heimdall_mx_retail",
    type: "bank",
    code: "1014",
    website: null,
    display_name: "Heimdall Bank (Pruebas MFA)",
    country_code: "MX",
    country_codes: ["MX"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/heimdall.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/heimdall_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/heimdall.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "username",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "password",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "token",
        type: "number",
        label: "Token",
        length: "6",
        optional: true,
        validation: "^\\d{6}$",
        validation_message: "Requiere 6 dígitos",
      },
    ],
    features: [
      {
        name: "token_required",
        description:
          "institution may need a token during link creation / login",
      },
    ],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "BALANCES",
      "INCOMES",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
    ],
    openbanking_information: null,
  },
  {
    id: 1015,
    name: "ironbank_br_business",
    type: "bank",
    code: "1015",
    website: null,
    display_name: "Iron Bank (Advanced login)",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/ironbank.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/ironbank_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/ironbank.svg",
    form_fields: [
      {
        name: "username_type",
        type: "select",
        values: [
          {
            code: "999",
            label: "Identification (invalid)",
            validation: "^.{1,}$",
            validation_message: "Credenciales incorrectas.",
            placeholder: "Número de identificación.",
          },
          {
            code: "003",
            label: "Passport (valid)",
            validation: "^.{1,}$",
            validation_message: "Credenciales incorrectas.",
            placeholder: "Número de identificación.",
          },
        ],
        placeholder: "Opções de acesso",
        pre_selected: 0,
      },
      {
        name: "username",
        type: "text",
        label: "Conta",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "username2",
        type: "text",
        label: "Conta 2",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "Senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password2",
        type: "password",
        label: "Senha 2",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: ["ACCOUNTS", "TRANSACTIONS", "OWNERS", "BALANCES"],
    openbanking_information: null,
  },
  {
    id: 1016,
    name: "ironbank_br_retail",
    type: "bank",
    code: "1016",
    website: null,
    display_name: "Iron Bank (Advanced login)",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/ironbank.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/ironbank_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/ironbank.svg",
    form_fields: [
      {
        name: "username_type",
        type: "select",
        values: [
          {
            code: "999",
            label: "Identification (invalid)",
            validation: "^.{1,}$",
            validation_message: "Credenciales incorrectas.",
            placeholder: "Número de identificación.",
          },
          {
            code: "003",
            label: "Passport (valid)",
            validation: "^.{1,}$",
            validation_message: "Credenciales incorrectas.",
            placeholder: "Número de identificación.",
          },
        ],
        placeholder: "Opções de acesso",
        pre_selected: 0,
      },
      {
        name: "username",
        type: "text",
        label: "Conta",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "username2",
        type: "text",
        label: "Conta 2",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "Senha",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password2",
        type: "password",
        label: "Senha 2",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RECURRING_EXPENSES",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
    ],
    openbanking_information: null,
  },
  {
    id: 9256,
    name: "ofmockbank_br_retail",
    type: "bank",
    code: null,
    website: null,
    display_name: "OF Mock Bank by Raidiam",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#016FD0",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/logo_mockbank_text.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/mockbank_icon.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/logo_mockbank_text.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "CPF",
        validation: "^\\d{11}|\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
        placeholder: "12345678901",
        validation_message:
          "Requiere 11 dígitos o 11 dígitos con formato 123.456.789-01",
      },
    ],
    features: [],
    integration_type: "openfinance",
    status: "healthy",
    resources: [
      "ACCOUNTS",
      "TRANSACTIONS",
      "OWNERS",
      "RISK_INSIGHTS",
      "BALANCES",
      "INCOMES",
      "INVOICES",
    ],
    openbanking_information: {
      description: "Openbanking description",
      participants: ["Openbanking participants"],
    },
  },
  {
    id: 9454,
    name: "planet_mx_employment",
    type: "employment",
    code: "9454",
    website: null,
    display_name: "Planet Express Employment",
    country_code: "MX",
    country_codes: ["MX"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/IMSS_text.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/IMSS_icon.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/IMSS_text.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "CURP",
        validation: "^([A-Z]{4})([0-9]{6})([A-Z]{6})([A-Z0-9]{2})$",
        placeholder: "Ej: LOLJ970312MBSPPN08",
        validation_message:
          "La CURP tiene que ser de 18 caracteres y mayúsculas",
      },
      {
        name: "password",
        type: "hidden",
        value: "fake-password",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: ["EMPLOYMENT_RECORDS", "OWNERS"],
    openbanking_information: null,
  },
  {
    id: 1013,
    name: "tatooine_mx_fiscal",
    type: "fiscal",
    code: "1013",
    website: null,
    display_name: "Tatooine Fiscal",
    country_code: "MX",
    country_codes: ["MX"],
    primary_color: "#056dae",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/tatooine.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/tatooine_sm.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/tatooine.svg",
    form_fields: [
      {
        name: "username",
        type: "text",
        label: "username",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        placeholder: "12345678901",
        validation_message: "Requiere 1 y 16 caracteres",
      },
      {
        name: "password",
        type: "password",
        label: "password",
        validation: "^[a-zA-Z0-9_]{1,16}$",
        validation_message: "Requiere 1 y 16 caracteres",
      },
    ],
    features: [],
    integration_type: "credentials",
    status: "healthy",
    resources: [
      "TAX_COMPLIANCE_STATUS",
      "TAX_RETURNS",
      "TAX_STATUS",
      "INVOICES",
      "FINANCIAL_STATEMENTS",
    ],
    openbanking_information: null,
  },
];
const App = () => {
  // const createLink = () => {
  //   banks.map((bank, i) => {
  //     axios
  //       .post(
  //         `${BelvoApiUrl}/api/links/`,
  //         {
  //           institution: bank.name,
  //           username: "yair",
  //         },
  //         {
  //           headers: { Authorization: authHeader },
  //         }
  //       )
  //       .then((res) => {
  //         toast.success("Link created successfully.");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Failed to create link.");
  //       });
  //   });
  // };
  // createLink();
  return (
    <div className="">
      <MyRouter />
      <ToastContainer />
    </div>
  );
};

export default App;
