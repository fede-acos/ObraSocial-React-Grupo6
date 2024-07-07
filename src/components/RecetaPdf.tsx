import { RecetaDto } from "../types/RecetaDto"
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { RecetaParaPdf } from "../types/RecetaParaPdf";
import { Card } from "@nextui-org/react";


const MyDocument = ({ receta }: { receta: RecetaParaPdf | null }) => (

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                <Text style={styles.title}>Receta Médica</Text>
                </View>
                <View style={styles.section}>
                <Text style={styles.label}>ID del Turno:</Text>
                <Text style={styles.text}>{receta?.turnoId}</Text>
                </View>
                <View style={styles.section}>
                <Text style={styles.label}>Descripción:</Text>
                <Text style={styles.text}>{receta?.receta}</Text>
                </View>
            </Page>
        </Document>

  );
  
  const styles = StyleSheet.create({
      page: {
        padding: 30,
        backgroundColor: '#E4E4E4',
        flexDirection: 'column',   
        fontSize: 12,    
      },
      header: {
        marginBottom: 20,
        textAlign: 'center'
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textDecoration: 'underline'
      },
      section: {
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
      },
      text: {
        fontSize: 14
      }
    });
    
interface PdfProps {
    receta: RecetaDto;
}
const RecetaPdf: React.FC<PdfProps> = ({ receta}: PdfProps) => {

  const recetaParaPdf: RecetaParaPdf = {
    turnoId: receta.turnoId.toString(),
    receta: receta.receta
  };


    return (
        <div className="flex flex-col items-center justify-center min-h-500">
            <MyDocument receta={recetaParaPdf}></MyDocument>
            {receta && 
                <PDFDownloadLink document={<MyDocument receta={recetaParaPdf} />} fileName="receta.pdf">
                {({ loading }) => (loading ? 'Cargando documento...' : 'Descargar')}
                </PDFDownloadLink>
            }
        </div>
    );

}

export default RecetaPdf

    