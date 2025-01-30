import React, { useState, useEffect,  useRef, useMemo } from 'react'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Asset } from 'expo-asset';

import { 
  View, 
  Alert,
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar, 
  Dimensions,
  Image, 
  TextInput, 
  Button, 
  ScrollView 
} from 'react-native'; 
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'; 
import { NavigationContainer, useNavigation } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createStackNavigator } from '@react-navigation/stack';
import { Pressable } from 'react-native';

// Dados simulados
const DATA = [
  {
    id: '1',
    title: 'Sou Um Cliente',
    icon: require('./assets/Cliente.png'),
    description: 'Conectamos você aos melhores profissionais locais.',
    href: 'Cliente',
  },
  {
    id: '2',
    title: 'Sou um Profissional',
    icon: require('./assets/Trabalhador.png'),
    description: 'Mostre seu talento para quem precisa, onde estiver.',
    href: 'Profissional',
  },
];

// Item da lista
const Item = ({ title, icon, navigation, href, description }) => (
  <View style={styles.item}>
    <Image source={icon} style={styles.image} />
    <View style={styles.itemContent}>
      <Text style={styles.title} onPress={() => navigation.navigate(href)}>{title}</Text>
      <Text style={styles.description} onPress={() => navigation.navigate(href)}>{description}</Text>
    </View>
  </View>
);

// Tela Home
function Home() {
  const navigation = useNavigation()
  const [nome, setNome] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  useEffect(() => {
    const fetchNome = async () => {
      try {
        const storedNome = await AsyncStorage.getItem('nome'); // Aqui você busca o nome
        const storedTipoUsuario = await AsyncStorage.getItem('tipoUsuario');
        if (storedNome) setNome(storedNome);
        if (storedTipoUsuario) setTipoUsuario(storedTipoUsuario);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };    

  
    fetchNome();
  }, []);
  
 
 
  
  
  

  // Certifique-se de que as categorias estão definidas aqui
  const categories = [
    {
      id: '1',
      icon: require('./assets/reparo.png'),
      name: 'Reparos, Construções e Serviços Gerais',
      services: [
        { 
          id: '1',
          name: 'Calheiro',
          description: 'Calhas, rufus e condutores fluviais',
          avaliacao: '5.0',
          image: require('./assets/calheiro.png'),
        },
        {
          id: '2',
          name: 'Eletricista',
          description: 'Conserto de instalações',
          avaliacao: '5.0',
          image: require('./assets/eletric.png'),
        },
        {
          id: '3',
          name: 'Manicure',
          description: 'Cuidados estéticos',
          avaliacao: '4.8',
          image: require('./assets/manicure.png'),
        },
        
        {
          id: '4',
          name: 'Entregador',
          description: 'Entregas',
          avaliacao: '4.8',
          image: require('./assets/fast-delivery.png'),
        },
      
      ],
    },
    {
      id: '2',
      icon: require('./assets/robotic-hand.png'),
      name: 'Tecnologia, Educação e Consultorias',
      services: [
        {
          id: '1',
          name: 'Professor Particular',
          description: 'Aulas particulares de matemática',
          avaliacao: '4.9',
          image: require('./assets/teacher.png'),
        },
        {
          id: '2',
          name: 'Programador',
          description: 'Criação de sites e aplicativos',
          avaliacao: '5.0',
          image: require('./assets/programador.png'),
        },
        {
        id: '3',
        name: 'Técnico em Informática',
        description: 'Criação de sites e aplicativos',
        avaliacao: '5.0',
        image: require('./assets/tecnicodeinfo.png'),
      },
      ],
    },
    {
      id: '3',
      icon: require('./assets/home.png'),
      name: 'Imóveis, Veículos e Locações Gerais',
      services: [
        {
          id: '1',
          name: 'Aluguel de Casas e kitnets',
          description: 'Casas para aluguel por temporada',
          avaliacao: '4.7',
          image: require('./assets/house-rent.png'),
        },
        {
          id: '2',
          name: 'Venda de Automóveis',
          description: 'Venda de carros novos e usados',
          avaliacao: '4.8',
          image: require('./assets/car-sale.png'),
        },
        {
          id: '3',
          name: 'Alocação Geral',
          description: 'alocação geral',
          avaliacao: '4.8',
          image: require('./assets/alocacao.png'),
        },
        
      ],
    },
    {
      id: '4',
      icon: require('./assets/better-health.png'),
      name: 'Saúde, Beleza e Bem-Estar',
      services: [
        {
          id: '1',
          name: 'Personal Trainer',
          description: 'Treinos personalizados',
          avaliacao: '5.0',
          image: require('./assets/personal-trainer.png'),
        },
        {
          id: '2',
          name: 'Nutricionista',
          description: 'Consultas de nutrição',
          avaliacao: '4.9',
          image: require('./assets/nutritionist.png'),
        },
        {
          id: '3',
          name: 'Psicologo(a)',
          description: 'alocação geral',
          avaliacao: '4.8',
          image: require('./assets/psicologa.png'),
        },
      ],
    },
  ];

  return(
    <ScrollView>
    <SafeAreaView style={styles.container}>
      {/* Campo de Busca e Botão */}
      
      <Text style={styles.footerheader}>Olá, {nome}</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder=" 🔍  O Que Precisa? "
        />
       
      </View>
      


      {/* Categorias */}
      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <View key={category.id} style={styles.category}>
            <Image source={category.icon} style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
        
      </View>


 
    </SafeAreaView>

//subcategorias
<View style={styles.mainContainer}>
  <FlatList
    data={categories}
    keyExtractor={(item) => item.id}
    navigation={navigation}
    renderItem={({ item }) => (
      
      <View style={styles.categoryBox}>
        {/* Título da Categoria */}
        <Text style={styles.categoryHeader}>{item.name}</Text>
        
        {/* FlatList Horizontal para Serviços */}
        <FlatList
          data={item.services}
          keyExtractor={(service) => service.id}
          navigation={navigation}
          horizontal
          showsHorizontalScrollIndicator={false}
          
          renderItem={({ item: service }) => (
            <Pressable onPress={() => {navigation.navigate('Prepararpedido', { service }) }}>
            <View style={styles.serviceCard}>
              <Image source={service.image} style={styles.serviceIcon} />
              <Text style={styles.serviceLabel}>{service.name}</Text>
            </View>
            </Pressable>
          )}
        />
      </View>
      
    )}
  />
</View>


        </ScrollView>
  ); 
}

function Prepararpedido({ route, navigation }) {
  
  const { service } = route.params;
  return (
    <View  >
      <Pressable onPress={() => navigation.navigate('App')} style={styles.headerpedir}>
      <Image source={require('./assets/previous.png')} style={styles.imageBack}  />
      <Text style={styles.footerheaderPedidos2}>{service.name}</Text>
      </Pressable>
      <View style={styles.imageContainer}>
      <Image source={require('./assets/shopping-bag.png')} style={styles.imagePedir} />
      </View>
      <Text style={styles.footerheaderPedidos}>Prepare-se para pedir!</Text>
      <Text style={styles.descriptionItem2}>Mas Antes, Aqui vai algumas Dicas:</Text>

      <View style={styles.containerPedido} >
      <Icon name="lightbulb" size={20} color="#FFC107" style={styles.icon} />
      <View>
      <Text style={styles.categoryHeader2}>Explique o que Você Precisa</Text>
      <Text style={styles.categoryText2}>Quanto mais detalhes sobre a sua solicitação, 
        mais profissionais poderão entrar em contato com você.
      </Text>
      </View>
      </View>

      <View style={styles.containerPedido} >
      <Icon name="timer" size={20} color="#1565C0" style={styles.icon} />
      <View>
      <Text style={styles.categoryHeader2}>Aguarde o contato dos profissionais</Text>
      <Text style={styles.categoryText2}>Levaremos seu pedido para que profissionais avaliados atendam a sua solicitação.
      </Text>
      </View>
      </View>

      <Pressable onPress={() => navigation.navigate('FormularioPedidos' )}>
      <Text style={styles.iniciarsolic} >
        Iniciar Solicitação
        </Text>
        </Pressable>
    </View>
  );
}

function FormularioPedidos() {
 const navigation = useNavigation()
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = async () => {
    if (!titulo || !descricao || !localizacao || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    const novoPedido = {
      id: Date.now().toString(), // ID único baseado no timestamp
      titulo,
      descricao,
      localizacao,
      telefone,
    };
  
    try {
      const pedidosExistentes = await AsyncStorage.getItem('pedidos');
      const pedidosAtualizados = pedidosExistentes ? JSON.parse(pedidosExistentes) : [];
  
      pedidosAtualizados.push(novoPedido);
  
      await AsyncStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
  
      Alert.alert('Sucesso', 'Pedido enviado com sucesso!');
      setTitulo('');
      setDescricao('');
      setLocalizacao('');
      setTelefone('');
      navigation.navigate('App');
    } catch (error) {
      console.error('Erro ao salvar o pedido:', error);
      Alert.alert('Erro', 'Não foi possível salvar o pedido.');
    }
  };
  
  
  return (
    <ScrollView contentContainerStyle={styles.containerGrow}>
      <Pressable onPress={() => navigation.navigate('App')} style={styles.headerpedir}>
      <Image source={require('./assets/previous.png')} style={styles.imageBack}  />
      </Pressable>
      <View style={styles.imageContainer}>
      <Image source={require('./assets/happy.png')} style={styles.imagePedir} />
      </View>
      <Text style={styles.footerheaderPedidos2}>          Faça seu Pedido Agora!</Text>

      <Text style={styles.label}>Título do Pedido*</Text>
      <TextInput
        style={styles.inputPedir}
        placeholder="Ex: Preciso de um..."
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição*</Text>
      <TextInput
        style={[styles.inputPedir, styles.textArea]}
        placeholder="Descreva o que você precisa com detalhes"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={styles.label}>Localização*</Text>
      <TextInput
        style={styles.inputPedir}
        placeholder="Ex: Rua Projetada, Nº 123, Centro"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <Text style={styles.label}>Telefone de Contato*</Text>
      <TextInput
        style={styles.inputPedir}
        placeholder="Ex: (99) 99999-9999"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.buttonPedir} onPress={handleSubmit}>
        <Text style={styles.buttonTextPedir}>Enviar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const verificarDados = async () => {
  const telefone = await AsyncStorage.getItem('telefone');
  const password = await AsyncStorage.getItem('password');
  const tipoUsuario = await AsyncStorage.getItem('tipoUsuario');
  console.log('Dados armazenados:', { telefone, password, tipoUsuario });
};
verificarDados();


function Cliente({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setconfirmSenha] = useState('');

  const handleCadastro = async () => {
    if (!nome || !telefone || !senha || !confirmSenha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
  
    if (senha !== confirmSenha) {
      alert('As senhas não coincidem');
      return;
    }
  
    try {
      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('telefone', telefone);
      await AsyncStorage.setItem('password', senha);
      await AsyncStorage.setItem('tipoUsuario', 'cliente'); // Salvar tipo de usuário
  
      // Log para verificar o que foi salvo
      console.log('Dados salvos:', { nome, telefone, senha, tipoUsuario: 'cliente' });
  
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao salvar dados', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar.');
    }
  };
  

  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.registerContainer}>
        <Text style={styles.loginHeader}>Cadastro do Cliente</Text>
        <TextInput
          style={styles.input}
          placeholder="Primeiro Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de Telefone (WhatsApp) "
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />
          <TextInput
          style={styles.input}
          placeholder="Senha "
          keyboardType="visible-password"
          value={senha}
          onChangeText={(senha) => setSenha(senha)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha "
          keyboardType="visible-password"
          value={confirmSenha}
          onChangeText={(confirmSenha) => setconfirmSenha(confirmSenha)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <Text style={styles.description}>Ja tenho Conta!</Text>
      </View>
    </SafeAreaView>
  );
}


// Outras telas e navegação
const { height } = Dimensions.get('window');

const videos = [
  { id: '1', category: 'Cuidados Estéticos', uri: require('./assets/anuncio1.mp4'), professional: 'Maria Cabeleira' },
  { id: '2', category: 'Reformas', uri: require('./assets/servente.mp4'), professional: 'Pedro Pedreiro' },
  { id: '3', category: 'Cuidados Estéticos', uri: require('./assets/servente.mp4'), professional: 'Ana Manicure' },
  { id: '4', category: 'Educação', uri: require('./assets/servente.mp4'), professional: 'João Professor' },
  { id: '5', category: 'Saúde', uri: require('./assets/servente.mp4'), professional: 'Dra. Maria Nutricionista' },
];

function Explorar() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [loadedVideos, setLoadedVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    async function loadAssets() {
      const loadedUris = await Promise.all(
        videos.map(async (video) => {
          const asset = await Asset.fromModule(video.uri).downloadAsync();
          return { ...video, uri: asset.uri };
        })
      );
      setLoadedVideos(loadedUris);
    }
    loadAssets();
  }, []);

  const videosFiltrados = useMemo(() => {
    return categoriaSelecionada === 'Todas'
      ? loadedVideos
      : loadedVideos.filter(video => video.category === categoriaSelecionada);
  }, [categoriaSelecionada, loadedVideos]);

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentVideo(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={currentVideo === index}
        isLooping
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            setCurrentVideo(null);
          }
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.professionalName}>{item.professional}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={categoriaSelecionada}
        onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
        style={styles.pickerContainer}
      >
        <Picker.Item label="Todas" value="Todas" />
        <Picker.Item label="Reparos" value="Reparos" />
        <Picker.Item label="Cuidados Estéticos" value="Cuidados Estéticos" />
        <Picker.Item label="Educação" value="Educação" />
        <Picker.Item label="Saúde" value="Saúde" />
      </Picker>
      <FlatList
        data={videosFiltrados}
        keyExtractor={(item) => item.id}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        snapToInterval={height}
        decelerationRate="fast"
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={renderItem}
      />
    </View>
  );
}



function Pedidos() {
  const [pedidos, setPedidos] = useState([]); // Estado para armazenar os pedidos

  // Função para carregar pedidos do AsyncStorage
  const carregarPedidos = async () => {
    try {
      // Recuperar os pedidos do AsyncStorage
      const pedidosSalvos = await AsyncStorage.getItem('pedidos');
      if (pedidosSalvos) {
        setPedidos(JSON.parse(pedidosSalvos)); // Atualiza o estado com os pedidos recuperados
      }
    } catch (error) {
      console.error('Erro ao carregar os pedidos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os pedidos.');
    }
  };

  // useEffect para carregar os pedidos quando o componente for montado
  useEffect(() => {
    carregarPedidos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Título */}
      <Text style={styles.screenHeader}>Seus Pedidos</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={carregarPedidos}>
  <Text style={styles.refreshButtonText}>Atualizar</Text>
</TouchableOpacity>

      {/* Lista de Pedidos */}
      {pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.pedidoContainer2}>
              <Text style={styles.pedidoTitle}>{item.titulo}</Text>
              <Text style={styles.pedidoDescription}>{item.descricao}</Text>
              <Text style={styles.pedidoDescription}>📍 {item.localizacao}</Text>
              <Text style={styles.pedidoDescription}>📞 {item.telefone}</Text>
            </View>
          )}
        />
      ) : (
        // Caso não haja pedidos salvos
        <Text style={styles.noPedidos}>Nenhum pedido encontrado.</Text>
      )}
    </SafeAreaView>
  );
}



function Perfil({route, navigation ,telefone}) {
  const [nome, setNome] = useState('')
  useEffect(() => {
    const fetchNome = async () => {
      try {
        const storedNome = await AsyncStorage.getItem('nome');
        if (storedNome) {
          setNome(storedNome); // Atualiza o estado com o nome recuperado
        }
      } catch (error) {
        console.error('Erro ao buscar o nome:', error);
      }
    };
  
    fetchNome();
  }, []);
  
  return (
    <SafeAreaView style={styles.container2}>
      {/* Botão para voltar */}
      <Pressable onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Image source={require('./assets/previous.png')} style={styles.imageBack2} />
      </Pressable>

      {/* Header com imagem de perfil e nome */}
      <View style={styles.imageContainer2}>
        <Image source={require('./assets/user.png')} style={styles.image2} />
        <Text style={styles.userName}>{nome || 'Nome do Cliente'}</Text>
      </View>

      {/* Descrição do perfil */}
      <Text style={styles.description2}>Visualize e edite suas informações abaixo:</Text>

      {/* Área de edição */}
      <ScrollView contentContainerStyle={styles.formContainer2}>
        {/* Campo Nome */}
        <Text style={styles.label2}>Nome:</Text>
        <TextInput
          style={styles.input2}
          placeholder="Seu nome"
          value={nome}
        />


        {/* Campo Telefone */}
        <Text style={styles.label2}>Telefone:</Text>
        <TextInput
          style={styles.input2} 
          placeholder="Seu telefone"
          value={telefone}
          keyboardType="phone-pad"
        />

       

        {/* Botão de salvar */}
        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const Boasvindas = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.screenHeader}>Bem-vindo(a) ao Skill Market Sapezal!</Text>
    <Text style={styles.description}>Por favor, escolha uma opção para continuar:</Text>
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={item.icon} style={styles.image} />
          <View style={styles.itemContent}>
            <Text style={styles.title} onPress={() => navigation.navigate(item.href)}>
              {item.title}
              
            </Text>
            <Text style={styles.description} onPress={() => navigation.navigate(item.href)}>{item.description}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
    <Text style={styles.footer}>Termos de Uso | Política de Privacidade</Text>
  </SafeAreaView>
);

function Profissional({ navigation }) {
  const [nome, setNome] = useState('');
  const [area, setArea] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  
  const handleCadastro = async () => {
    if (!nome || !area || (tipoUsuario === 'profissional' && !telefone)) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
  
    try {
      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('tipoUsuario', 'profissional'); // Marca como profissional
      if (telefone) await AsyncStorage.setItem('telefone', telefone);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao salvar dados', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar.');
    }
  };

  const areasDisponiveis = [
    'Reparos, Construções e Serviços Gerais',
    'Tecnologia, Educação e Consultorias',
    'Imóveis, Veículos e Locações Gerais',
    'Saúde, Beleza e Bem-Estar',
  ];

  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmSenha, setconfirmSenha] = useState('')

  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.registerContainer}>
      <Image source={require('./assets/Logo_.png')} style={styles.categoryIconLogin} />
        <Text style={styles.loginHeader}>Cadastro de Profissional</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

      <TextInput
          style={styles.input}
          placeholder="Número de telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={(telefone) => setTelefone(telefone)}
        />

        <Text style={styles.label}>Área de Atuação*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={area}
            onValueChange={(itemValue) => setArea(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma área" value="" />
            {areasDisponiveis.map((area, index) => (
              <Picker.Item key={index} label={area} value={area} />
            ))}
          </Picker>

        </View>

    <TextInput
              style={styles.input}
              placeholder="senha"
              keyboardType="visible-password"
              value={senha}
              onChangeText={(senha) => setSenha(senha)}
            />
            <TextInput
          style={styles.input}
          placeholder="confirmar senha"
          keyboardType="visible-password"
          value={confirmSenha}
          onChangeText={(confirmSenha) => setconfirmSenha(confirmSenha)}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
function Inicio() {
  const [nome, setNome] = useState('');
  const [area, setArea] = useState('');
  const [pedidos, setPedidos] = useState([]);

  // Carregar nome e área de atuação do profissional
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const storedNome = await AsyncStorage.getItem('nome');
        const storedArea = await AsyncStorage.getItem('area');
        if (storedNome) setNome(storedNome);
        if (storedArea) setArea(storedArea);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, []);

  // Carregar pedidos do AsyncStorage
  const carregarPedidos = async () => {
    try {
      const pedidosSalvos = await AsyncStorage.getItem('pedidos');
      if (pedidosSalvos) {
        const pedidosFiltrados = JSON.parse(pedidosSalvos).filter(pedido => pedido.area === area);
        setPedidos(pedidosFiltrados);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, [area]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.footerheader}>Bem-vindo, {nome}!</Text>
      

      {pedidos.length > 0 ? (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.pedidoContainer}>
              <Text style={styles.pedidoTitle}>{item.titulo}</Text>
              <Text style={styles.pedidoDescription}>{item.descricao}</Text>
              <Text style={styles.pedidoDescription}>📍 {item.localizacao}</Text>
              <Text style={styles.pedidoDescription}>📞 {item.telefone}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noPedidos}>Nenhum pedido encontrado na sua área.</Text>
      )}
    </SafeAreaView>
  );
}

function Login({ navigation }) {
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const storedTelefone = await AsyncStorage.getItem('telefone');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedTipoUsuario = await AsyncStorage.getItem('tipoUsuario'); // Adiciona o tipo do usuário
  
      if (telefone === storedTelefone && senha === storedPassword) {
        Alert.alert('Sucesso', 'Login bem-sucedido!');
        
        if (storedTipoUsuario === 'profissional') {
          navigation.navigate('AppTabsProfissional'); // Redireciona para Home do Profissional
        } else if (storedTipoUsuario === 'cliente') {
          navigation.navigate('App'); // Redireciona para Home do Cliente
        } else {
          Alert.alert('Erro', 'Tipo de usuário não reconhecido.');
        }
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao recuperar dados', error);
      Alert.alert('Erro', 'Ocorreu um erro ao realizar login.');
    }
  };
  

  return (
    <SafeAreaView style={[styles.container, styles.centered]}>
      <View style={styles.loginContainer}>
        <Image source={require('./assets/Logo_.png')} style={styles.categoryIconLogin} />
        <Text style={styles.loginHeader}>Faça Login!</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar!</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('Boas-vindas')}>
        <Text style={styles.footer}>Não tenho Conta!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6c63ff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Escolha os ícones com base no nome da rota
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Explorar") {
            iconName = "play-circle";
          } 
          else if (route.name === "Pedidos") {
            iconName = "assignment";
          } else if (route.name === "Perfil") {
            iconName = "person";
          }

          // Retorne o ícone usando react-native-vector-icons
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Explorar" component={Explorar} />
      <Tab.Screen name="Pedidos" component={Pedidos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

function AppTabsProfissional() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6c63ff',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 5 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // Escolha os ícones com base no nome da rota
          if (route.name === "Inicio") {
            iconName = "work";
          } else if (route.name === "Explorar") {
            iconName = "play-circle";
          } else if (route.name === "Ranking") {
            iconName = "assignment";
          } else if (route.name === "Perfil") {
            iconName = "person";
          }

          // Retorne o ícone usando react-native-vector-icons
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Explorar" component={Explorar} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}



export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          headerStyle: { backgroundColor: 'white' }, 
          headerTintColor: 'black', 
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Boas-vindas" component={Boasvindas} />
        <Stack.Screen name="Profissional" component={Profissional} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Explorar" component={Explorar} />
        <Stack.Screen name="AppTabsProfissional" component={AppTabsProfissional} />
        <Stack.Screen name="Cliente" component={Cliente} />
        <Stack.Screen name="App" component={AppTabs} />
        <Stack.Screen name="Prepararpedido" component={Prepararpedido} />
        
      </Stack.Navigator>
      <StatusBar backgroundColor="#f9f9f9" barStyle="dark-content" />
    </NavigationContainer>
    
  );
}




  
// Estilos
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#f9f9f9',
    padding: 30,
  },
  container3:{
    flex: 1,
    backgroundColor: '#000',
  },
  header2: {
    position: 'absolute',
    top: 20,
    zIndex: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    padding: 8,
    borderRadius: 8,
  },
  filterText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  videoContainer: {
    height: Dimensions.get('window').height, // Altura igual à tela
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 80,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12, // Padding vertical para altura consistente
    paddingHorizontal: 20, // Padding horizontal para largura do botão
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    margin: '5%',
    borderRadius: 8,
},
saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto dentro do botão
},

  container2:{
    backgroundColor: '#f9f9f9',
    flex:1
  },
  backButton: {
      margin: 16,
    },
  
  containerGrow:{
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  containerPedido:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerpedir:{
  flexDirection: 'row',
  width:'60%',
  justifyContent: 'space-between'
  
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image2:{
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'roboto'
  },
  description2: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    color: '#555',
  },
  formContainer2: {
    padding: 16,
  },
  imageContainer2: {
      alignItems: 'center',
      marginTop: 24,
    },
  imagePedir:{
    width: 150,
    height: 150,

  },
  iniciarsolic: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4CAF50',
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 40,
    marginHorizontal: 50,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Fundo suave para o container principal
    padding: 16, // Espaçamento interno
  },
  categoryBox: {
    marginBottom: 24, // Espaçamento entre as categorias
    padding: 12, // Espaçamento interno no box da categoria
    borderRadius: 10, // Bordas arredondadas para um visual moderno
    backgroundColor: '#ffffff', // Fundo branco para destaque
    shadowColor: '#000', // Sombra para profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Sombra para Android
  },
  categoryHeader2:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryHeader: {
    fontSize: 22, // Tamanho maior para o título
    fontWeight: 'bold', // Texto em negrito para destaque
    color: '#222', // Cor escura para contraste
    marginBottom: 10, // Espaço abaixo do título
  },
  serviceCard: {
    marginRight: 16, // Espaçamento lateral entre serviços
    alignItems: 'center', // Centraliza os itens horizontalmente
    backgroundColor: '#fafafa', // Fundo leve para cada cartão
    padding: 12, // Preenchimento interno no cartão do serviço
    borderRadius: 8, // Bordas arredondadas
    shadowColor: '#000', // Sombra para profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
  },
  icon:{
    marginRight: 15,
  },
  serviceIcon: {
    width: 90, // Largura da imagem
    height: 90, // Altura da imagem
    borderRadius: 45, // Deixa a imagem circular
    marginBottom: 8, // Espaço entre a imagem e o texto
  },
  label:{
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
    label2: {
      fontSize: 14,
      marginBottom: 4,
      color: '#333',
    },
 
  serviceLabel: {
    fontSize: 16, // Tamanho do texto do serviço
    fontWeight: '500', // Peso intermediário para boa visibilidade
    color: '#555', // Cor suave para o texto
    textAlign: 'center', // Centraliza o texto
    fontFamily: 'roboto'
  },
  gradientHeader: {
    padding: 20,
    borderRadius: 10,
  },  
  criarpedido: {
    bottom: 50
  },
  registerContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: 'roboto'
  },
  buttonTextPedir:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  
  loginContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  registerContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loginHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#6c63ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:20,
    bottom: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  input2:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  createOrderButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  createOrderContainer:{
    width: '70%',
  
    justifyContent:'center',
    textAlign: 'center',
    left: '15%',
    marginBottom: 20,
  },
  createOrderButtonText: {
    fontFamily: 'roboto',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    textAlign:'center',
    marginTop:20,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  category: {
    alignItems: 'center',
    marginBottom: 16,
    width: '23%',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  categoryIconLogin:{
    width: 80,
    height: 80,
    left: 110,
    marginBottom: 8,
    alignItems: 'center'
  },
  categoryText2: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'roboto'
  },
  service: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#666',
    alignSelf: 'center',
  },  
  serviceImage: {
    width: 100,
    height: 100,
  },
  serviceContent: {
    flex: 1,
    padding: 13,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c63ff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pedidoContainer2:{
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Para sombras no Android
    flexDirection: 'column',
  
  },
  pedidoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Para sombra no Android
    flexDirection: 'column',
  },
  pedidoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  pedidoTitle2:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  pedidoDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  noPedidos: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  refreshButton: {
    backgroundColor: '#6c63ff', // Cor de destaque para o botão
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#6c63ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  screenHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Texto mais escuro para maior contraste
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  inputPedir:{
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  itemContent: {
    flex:1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  descriptionItem: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  
  footer: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    paddingBottom: 10,
  },
  footerheader:{
    fontSize: 16,
    color: 'black',//#888
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 40,
    paddingBottom: 15,
  },
  footerheaderPedidos:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  footerheaderPedidos2:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
    width:300,
    marginTop:10,
    justifyContent:'center',
    fontFamily: 'roboto'
  },
  descriptionItem2: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    
  },
  reelContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  reelImage: {
    width: 300,
    height: 200,
    marginRight: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 50, // Defina uma largura fixa
    height: 50, // Defina uma altura fixa
    resizeMode: 'contain', // Garante que a proporção seja mantida
    marginRight: 10, //
  },  
  imageBack2:{
    width: 54,
    height: 54,
  },
  imageBack:{
    width: 50, // Defina uma largura fixa
    height: 50, // Defina uma altura fixa
    resizeMode: 'contain', // Garante que a proporção seja mantida
    marginLeft: 20, //
    marginTop:10
  },
  buttonPedir:{
    backgroundColor: '#6c63ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});