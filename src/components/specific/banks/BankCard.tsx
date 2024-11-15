import { Avatar, Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";

interface BankData {
  id: number;
  name: string;
  type: string;
  display_name: string;
  country_code: string;
  country_codes: string[];
  primary_color: string;
  logo: string;
  icon_logo: string;
  text_logo: string;
}
interface Props {
  bank: BankData;
}
const BankCard = ({ bank }: Props) => {
  const bankData: BankData = {
    id: 9256,
    name: "ofmockbank_br_retail",
    type: "bank",
    display_name: "OF Mock Bank by Raidiam",
    country_code: "BR",
    country_codes: ["BR"],
    primary_color: "#016FD0",
    logo: "https://statics.sandbox.belvo.io/institutions/text_logos/logo_mockbank_text.svg",
    icon_logo:
      "https://statics.sandbox.belvo.io/institutions/icon_logos/mockbank_icon.svg",
    text_logo:
      "https://statics.sandbox.belvo.io/institutions/text_logos/logo_mockbank_text.svg",
  };
  return (
    <Card className="w-full" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          className="bg-gray-500"
          src={
            bank.logo
              ? bank.logo
              : "https://images.inc.com/uploaded_files/image/1920x1080/getty_158673029_9707279704500119_78594.jpg"
          }
          height={160}
          alt="bank"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text size="lg" fw={900}>
          {bank.display_name}
        </Text>
        <Avatar variant="filled" color="" src={bank.icon_logo} alt="" />
      </Group>

      <div>
        <div className="flex gap-2 items-center">
          <FaGlobe /> {bank.country_code}
        </div>{" "}
        <div className="flex gap-2 items-center">ID: {bank.id}</div>
      </div>
      {/* <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text> */}

      <Link to={`/banks/${bank.name}/accounts`}>
        <Button color="blue" fullWidth mt="md" radius="md">
          Seleccionar
        </Button>
      </Link>
    </Card>
  );
};

export default BankCard;
