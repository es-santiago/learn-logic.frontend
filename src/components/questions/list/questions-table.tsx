import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import {
  getStatusColor,
  getStatusLabel,
} from "@/utils/enum/QuestionStatus.enum";
import { getLevelColor, getLevelLabel } from "@/utils/enum/QuestionLevel.enum.";
import {
  getActivatedColor,
  getActivatedLabel,
} from "@/utils/enum/Activated.enum";
import QuestionActions from "@/components/questions/list/actions";

interface QuestionsTableProps {
  filteredQuestions: Question[];
}
const QuestionsTable: React.FC<QuestionsTableProps> = ({
  filteredQuestions,
}) => {
  return (
    <TabsContent value="all">
      <Card>
        <CardHeader>
          <CardTitle>Questões</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Titulo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Ativa</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="font-medium">
                    {question.number}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {question.title.length > 85
                      ? `${question.title.slice(0, 85)}...`
                      : question.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(question.status)}>
                      {getStatusLabel(question.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getLevelColor(question.level)}>
                      {getLevelLabel(question.level)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActivatedColor(question.activated)}>
                      {getActivatedLabel(question.activated)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(question.creationDate).toLocaleDateString(
                      "pt-BR"
                    )}
                  </TableCell>
                  <TableCell>
                    <QuestionActions question={question} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default QuestionsTable;
